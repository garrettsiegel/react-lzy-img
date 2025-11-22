import { useState, useRef, useEffect } from 'react';
import type { ImgHTMLAttributes, CSSProperties, SyntheticEvent, ReactNode } from 'react';
import { decode } from 'blurhash';
import { useLazyLoad } from './useLazyLoad';

// Constants
const DEFAULT_FADE_DURATION = 300;
const DEFAULT_PRELOAD_MARGIN = '200px';
const BLURHASH_CANVAS_SIZE = 32;

// Inject CSS styles once
if (typeof document !== 'undefined' && !document.getElementById('react-lzy-img-style')) {
  const style = document.createElement('style');
  style.id = 'react-lzy-img-style';
  style.textContent = `
.lazy-image-wrapper {
  display: grid;
  grid-template-areas: 'stack';
  place-items: center;
}
.lazy-image-item {
  grid-area: stack;
  width: 100%;
  height: 100%;
}
.lazy-image-img {
  object-fit: cover;
}
.lazy-image-placeholder {
  object-fit: cover;
  filter: blur(1rem);
  pointer-events: none;
}
.lazy-image-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b00020;
  background: #fff0f0;
  border: 1px solid #f5c2c7;
  border-radius: 6px;
  font-size: 0.95em;
  min-height: 40px;
  padding: 8px 12px;
  text-align: center;
  box-sizing: border-box;
}
`;
  document.head.appendChild(style);
}

// Types
export interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 
  'src' | 'alt' | 'className' | 'style' | 'width' | 'height' | 'loading' | 'onLoad' | 'onError'> {
  /** Source URL of the image */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** Responsive image source set (enables picture element) */
  srcSet?: string;
  /** Media queries for responsive images */
  sizes?: string;
  /** Placeholder image URL */
  placeholder?: string;
  /** Blurhash string for blurred placeholder */
  blurhash?: string;
  /** Low Quality Image Placeholder URL */
  lqip?: string;
  /** Fade-in animation (default: true) */
  fadeIn?: boolean;
  /** Fade duration in ms (default: 300) */
  fadeInDuration?: number;
  /** CSS class name for wrapper */
  className?: string;
  /** Fixed width */
  width?: number | string;
  /** Fixed height */
  height?: number | string;
  /** CSS aspect-ratio */
  aspectRatio?: number;
  /** Custom styles for wrapper */
  style?: CSSProperties;
  /** Force visibility without intersection observer */
  forceVisible?: boolean;
  /** High priority loading */
  priority?: boolean;
  /** Preload margin (default: "200px") */
  preloadMargin?: string;
  /** Fallback content on error */
  fallback?: ReactNode | string;
  /** Custom aria-label */
  ariaLabel?: string;
  /** aria-describedby ID */
  ariaDescribedby?: string;
  /** Native loading attribute */
  loading?: ImgHTMLAttributes<HTMLImageElement>['loading'];
  /** Load event handler */
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  /** Error event handler */
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void;
}

// Blurhash canvas component
function BlurhashCanvas({ 
  blurhash, 
  isLoaded, 
  style 
}: { 
  blurhash: string; 
  isLoaded: boolean; 
  style: CSSProperties; 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!blurhash || !canvasRef.current || isLoaded) return;
    
    try {
      const pixels = decode(blurhash, BLURHASH_CANVAS_SIZE, BLURHASH_CANVAS_SIZE);
      const context = canvasRef.current.getContext('2d');
      
      if (context) {
        const imageData = context.createImageData(BLURHASH_CANVAS_SIZE, BLURHASH_CANVAS_SIZE);
        imageData.data.set(pixels);
        context.putImageData(imageData, 0, 0);
      }
    } catch {
      // Silently ignore decode failures
    }
  }, [blurhash, isLoaded]);

  return (
    <canvas
      ref={canvasRef}
      width={BLURHASH_CANVAS_SIZE}
      height={BLURHASH_CANVAS_SIZE}
      aria-hidden="true"
      className="lazy-image-item lazy-image-placeholder"
      style={style}
    />
  );
}

/**
 * LazyImage - Lightweight React component for lazy loading images with placeholders
 * 
 * Features:
 * - Lazy loading with Intersection Observer
 * - Responsive images (picture element when srcSet provided)
 * - Blurhash and LQIP placeholder support
 * - Smooth fade transitions
 * - Error fallback handling
 * - Accessibility features
 * 
 * @param props LazyImageProps
 */
export default function LazyImage(props: LazyImageProps) {
  const {
    src,
    alt,
    srcSet,
    sizes,
    placeholder,
    blurhash,
    lqip,
    fadeIn = true,
    fadeInDuration = DEFAULT_FADE_DURATION,
    className = '',
    width,
    height,
    aspectRatio,
    style = {},
    forceVisible = false,
    priority = false,
    preloadMargin = DEFAULT_PRELOAD_MARGIN,
    fallback,
    ariaLabel,
    ariaDescribedby,
    loading: loadingProp,
    onLoad,
    onError,
    ...imageProps
  } = props;

  // State
  const [containerRef, isInView] = useLazyLoad<HTMLDivElement>({ preloadMargin });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Computed values
  const shouldShow = forceVisible || priority || isInView || isLoaded;
  const shouldUsePicture = !!srcSet;
  
  // Styles
  const fadeStyle = (loaded: boolean): CSSProperties => {
    if (!fadeIn) return {};
    return {
      opacity: loaded ? 1 : 0,
      transition: `opacity ${fadeInDuration}ms ease-in-out`
    };
  };

  const containerStyle: CSSProperties = {
    width,
    height,
    ...(aspectRatio && { aspectRatio: String(aspectRatio) }),
    ...style,
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

  // Render placeholder
  const renderPlaceholder = () => {
    if (isLoaded) return null;

    // Priority: blurhash > lqip > placeholder
    if (blurhash) {
      return (
        <BlurhashCanvas
          blurhash={blurhash}
          isLoaded={isLoaded}
          style={fadeStyle(false)}
        />
      );
    }

    const placeholderSrc = lqip || placeholder;
    if (placeholderSrc) {
      return (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className="lazy-image-item lazy-image-placeholder"
          style={fadeStyle(false)}
        />
      );
    }

    return null;
  };

  // Render fallback for errors
  const renderFallback = () => {
    if (!hasError) return null;
    
    if (typeof fallback === 'string') {
      return <div className="lazy-image-item lazy-image-fallback">{fallback}</div>;
    }
    
    return fallback || <div className="lazy-image-item lazy-image-fallback">Image failed to load</div>;
  };

  // Render main image
  const renderImage = () => {
    if (!shouldShow) return null;

    const imageElement = (
      <img
        {...imageProps}
        src={src}
        alt={alt}
        loading={loadingProp ?? (priority ? 'eager' : 'lazy')}
        onLoad={handleLoad}
        onError={handleError}
        className="lazy-image-item lazy-image-img"
        style={fadeStyle(isLoaded)}
        {...(ariaLabel && { 'aria-label': ariaLabel })}
        {...(ariaDescribedby && { 'aria-describedby': ariaDescribedby })}
      />
    );

    // Use picture element for responsive images
    if (shouldUsePicture) {
      return (
        <picture className="lazy-image-item">
          {srcSet && <source srcSet={srcSet} sizes={sizes} />}
          {imageElement}
        </picture>
      );
    }

    return imageElement;
  };

  return (
    <div 
      ref={containerRef} 
      className={`lazy-image-wrapper${className ? ' ' + className : ''}`}
      style={containerStyle}
    >
      {renderFallback() || (
        <>
          {renderPlaceholder()}
          {renderImage()}
        </>
      )}
    </div>
  );
}
