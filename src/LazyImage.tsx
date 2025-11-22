import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import type { ImgHTMLAttributes, CSSProperties, SyntheticEvent, ReactNode } from 'react';
import { decode } from 'blurhash';
import './lazy-image.css';

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

// Inline lazy loading hook
function useLazyLoad(preloadMargin = '200px') {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: preloadMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [preloadMargin]);

  return [ref, isInView] as const;
}

/**
 * LazyImage - Lightweight React component for lazy loading images
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
  className,
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

  // Blurhash canvas effect
  useEffect(() => {
    if (!blurhash || !canvasRef.current || isLoaded) return;
    
    try {
      const pixels = decode(blurhash, 32, 32);
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const imageData = ctx.createImageData(32, 32);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
      }
    } catch {
      // Ignore decode errors
    }
  }, [blurhash, isLoaded]);

  const shouldShow = priority || isInView;
  const fadeStyle = fadeIn ? { 
    opacity: isLoaded ? 1 : 0, 
    transition: `opacity ${fadeInDuration}ms ease-in-out` 
  } : {};

  const containerStyle: CSSProperties = {
    width,
    height,
    ...(aspectRatio && { aspectRatio: String(aspectRatio) }),
    ...style,
  };

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.(event);
  };

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    onError?.(event);
  };

  // Error fallback
  if (hasError) {
    const errorContent = typeof fallback === 'string' 
      ? fallback 
      : fallback || 'Image failed to load';
    
    return (
      <div 
        ref={containerRef}
        className={`lazy-image-wrapper ${className || ''}`}
        style={containerStyle}
      >
        <div className="lazy-image-item lazy-image-fallback">
          {errorContent}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`lazy-image-wrapper ${className || ''}`}
      style={containerStyle}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <>
          {blurhash && (
            <canvas
              ref={canvasRef}
              width={32}
              height={32}
              aria-hidden="true"
              className="lazy-image-item lazy-image-placeholder"
              style={{ opacity: fadeIn ? 0.8 : 1 }}
            />
          )}
          {!blurhash && (lqip || placeholder) && (
            <img
              src={lqip || placeholder}
              alt=""
              aria-hidden="true"
              className="lazy-image-item lazy-image-placeholder"
              style={{ opacity: fadeIn ? 0.8 : 1 }}
            />
          )}
        </>
      )}

      {/* Main image */}
      {shouldShow && (
        srcSet ? (
          <picture className="lazy-image-item">
            <source srcSet={srcSet} sizes={sizes} />
            <img
              {...imageProps}
              src={src}
              alt={alt}
              loading={loading || (priority ? 'eager' : 'lazy')}
              onLoad={handleLoad}
              onError={handleError}
              className="lazy-image-item"
              style={fadeStyle}
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
            className="lazy-image-item"
            style={fadeStyle}
          />
        )
      )}
    </div>
  );
}
