import { useRef, useState, useEffect } from 'react';
import { decode } from 'blurhash';
import './injectStyle';
import type { Props } from './types';

export default function LazyImage(props: Props) {
  const {
    src, alt, placeholder, fadeIn = true, fadeInDuration = 300, className = '',
    width, height, aspectRatio, style = {}, forceVisible = false, onLoad, onError,
    fallback, blurhash, lqip, preloadMargin = '200px', priority = false,
    role, ariaLabel, ariaDescribedby,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(forceVisible || priority);
  const [hasError, setHasError] = useState(false);

  const hasIntersectionObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window;
  const shouldShowImage = priority || isInView;
  const imageLoading = priority ? 'eager' : 'lazy';

  // Draw blurhash placeholder
  useEffect(() => {
    if (!blurhash || !canvasRef.current || isLoaded) return;
    try {
      const canvasSize = 32;
      const pixels = decode(blurhash, canvasSize, canvasSize);
      const context = canvasRef.current.getContext('2d');
      if (context) {
        const imageData = context.createImageData(canvasSize, canvasSize);
        imageData.data.set(pixels);
        context.putImageData(imageData, 0, 0);
      }
    } catch {
      // Blurhash decode failed, fallback to other placeholders
    }
  }, [blurhash, isLoaded]);

  // Setup intersection observer for lazy loading
  useEffect(() => {
    if (priority || forceVisible || !containerRef.current) return;
    
    if (hasIntersectionObserver) {
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && (setIsInView(true), observer.disconnect()),
        { rootMargin: preloadMargin }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      setTimeout(() => setIsInView(true), 0);
    }
  }, [priority, forceVisible, preloadMargin, hasIntersectionObserver]);

  const containerStyle = {
    width, height,
    ...(aspectRatio && { aspectRatio: String(aspectRatio) }),
    ...style,
  };

  const fadeStyle = (loaded: boolean) => fadeIn 
    ? { opacity: loaded ? 1 : 0, transition: `opacity ${fadeInDuration}ms ease-in-out` }
    : { opacity: 1 };

  const wrapperClass = `LazyImage-wrapper${className ? ' ' + className : ''}`;
  const placeholderClass = `LazyImage-placeholder stack-item${fadeIn ? ' LazyImage-fade' : ''}`;
  const imageClass = `LazyImage-img stack-item${fadeIn ? ' LazyImage-fade' : ''}`;

  const handleLoad = () => (setIsLoaded(true), onLoad?.());
  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => (setHasError(true), onError?.(event));

  const renderPlaceholder = () => {
    if (blurhash && !isLoaded) {
      return (
        <canvas
          ref={canvasRef}
          width={32}
          height={32}
          aria-hidden="true"
          className={placeholderClass}
          style={{ ...fadeStyle(false), width: '100%', height: '100%', display: 'block' }}
        />
      );
    }
    
    const placeholderSrc = lqip || placeholder;
    if (placeholderSrc && !isLoaded) {
      return (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className={placeholderClass}
          style={fadeStyle(false)}
        />
      );
    }
    
    return null;
  };

  const renderFallback = () => {
    if (!hasError) return null;
    if (typeof fallback === 'string') {
      return <div className="LazyImage-fallback">{fallback}</div>;
    }
    return fallback || <div className="LazyImage-fallback">Image failed to load.</div>;
  };

  const renderImage = () => shouldShowImage && (
    <img
      src={src}
      alt={alt}
      loading={imageLoading}
      onLoad={handleLoad}
      onError={handleError}
      className={imageClass}
      style={fadeStyle(isLoaded)}
      role={role}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
    />
  );

  return (
    <div ref={containerRef} className={wrapperClass} style={containerStyle}>
      <div className="grid-stack">
        {renderFallback() || (
          <>
            {renderPlaceholder()}
            {renderImage()}
          </>
        )}
      </div>
    </div>
  );
}
