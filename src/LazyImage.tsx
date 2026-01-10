import React, { useState, useRef, useEffect } from 'react';
import type { ImgHTMLAttributes, CSSProperties, SyntheticEvent, ReactNode } from 'react';
import { decode } from 'blurhash';

export interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 
  'src' | 'alt' | 'className' | 'style' | 'width' | 'height' | 'loading' | 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  placeholder?: string;
  blurhash?: string;
  lqip?: string;
  fadeIn?: boolean;
  fadeInDuration?: number;
  className?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  style?: CSSProperties;
  priority?: boolean;
  preloadMargin?: string;
  fallback?: ReactNode | string;
  loading?: ImgHTMLAttributes<HTMLImageElement>['loading'];
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void;
}

// Inline styles to eliminate external CSS dependency
const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateAreas: '"stack"',
    placeItems: 'center',
  } as CSSProperties,
  item: {
    gridArea: 'stack',
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  placeholder: {
    filter: 'blur(1rem)',
    pointerEvents: 'none' as const,
  },
  fallback: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    color: '#6c757d',
    fontSize: '0.875rem',
    minHeight: '40px',
    padding: '8px 12px',
    textAlign: 'center' as const,
  },
};

// Simplified lazy loading hook
function useLazyLoad(preloadMargin = '200px') {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(() => 
    typeof window === 'undefined' || !('IntersectionObserver' in window)
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { rootMargin: preloadMargin }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [preloadMargin, isInView]);

  return [ref, isInView] as const;
}

/**
 * LazyImage - Lightweight React component for lazy loading images
 * Supports responsive images, placeholder images, and fade transitions
 */
export default function LazyImage({
  src,
  alt,
  srcSet,
  sizes,
  placeholder,
  blurhash,
  lqip,
  fadeIn = true,
  fadeInDuration = 300,
  className = '',
  width,
  height,
  aspectRatio,
  style = {},
  priority = false,
  preloadMargin = '200px',
  fallback,
  loading,
  onLoad,
  onError,
  ...imageProps
}: LazyImageProps) {
  const [containerRef, isInView] = useLazyLoad(preloadMargin);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate blurhash canvas when component mounts
  useEffect(() => {
    if (!blurhash || !canvasRef.current) return;
    
    // Check if already loaded to prevent race condition
    if (isLoaded) return;
    
    try {
      const pixels = decode(blurhash, 32, 32);
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const imageData = ctx.createImageData(32, 32);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
      }
    } catch (error) {
      // Warn about invalid blurhash
      console.warn('[LazyImage] Failed to decode blurhash:', error);
    }

    // Cleanup canvas on unmount
    return () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, 32, 32);
        }
      }
    };
  }, [blurhash, isLoaded]);

  // Determine when to load the actual image
  const shouldLoadImage = priority || isInView;
  
  // Respect prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shouldAnimate = fadeIn && !prefersReducedMotion;
  
  // Container styles with dimensions and aspect ratio
  const containerStyle: CSSProperties = {
    ...styles.wrapper,
    width,
    height,
    ...(aspectRatio && { aspectRatio: String(aspectRatio) }),
    ...style,
  };

  // Image transition styles
  const imageStyle = {
    ...styles.item,
    ...(shouldAnimate && { 
      opacity: isLoaded ? 1 : 0, 
      transition: `opacity ${fadeInDuration}ms ease-in-out` 
    }),
  };

  // Placeholder styles
  const placeholderStyle = {
    ...styles.item,
    ...styles.placeholder,
    opacity: fadeIn ? 0.8 : 1,
  };

  // Event handlers
  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.(event);
  };

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    onError?.(event);
  };

  // Error state
  if (hasError) {
    return (
      <div ref={containerRef} className={className} style={containerStyle}>
        <div style={styles.fallback}>
          {fallback || 'Image failed to load'}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      {/* Placeholder - blurhash canvas, lqip, or regular image */}
      {!isLoaded && (
        blurhash ? (
          <canvas
            ref={canvasRef}
            width={32}
            height={32}
            aria-hidden="true"
            style={placeholderStyle}
          />
        ) : (lqip || placeholder) ? (
          <img
            src={lqip || placeholder}
            alt=""
            aria-hidden="true"
            style={placeholderStyle}
          />
        ) : null
      )}
      
      {/* Main image */}
      {shouldLoadImage && (
        srcSet ? (
          <picture style={styles.item}>
            <source srcSet={srcSet} sizes={sizes} />
            <img
              {...imageProps}
              src={src}
              alt={alt}
              loading={loading || (priority ? 'eager' : 'lazy')}
              onLoad={handleLoad}
              onError={handleError}
              style={imageStyle}
            />
          </picture>
        ) : (
          <img
            {...imageProps}
            src={src}
            alt={alt}
            loading={loading || (priority ? 'eager' : 'lazy')}
            onLoad={handleLoad}
            onError={handleError}
            style={imageStyle}
          />
        )
      )}
    </div>
  );
}
