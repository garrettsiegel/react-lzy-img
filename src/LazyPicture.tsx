import { useRef, useState, useEffect } from 'react';
import { decode } from 'blurhash';
import './injectStyle';
import type { LazyPictureProps as Props } from './types';

export default function LazyPicture(props: Props) {
  const {
    src, alt, srcSet, sizes, placeholder, placeholderBlur = false, aspectRatio,
    fadeIn = true, fadeInDuration = 300, priority = false, className = '',
    width, height, style = {}, preloadMargin = '200px', onLoad, onError,
    fallback, blurhash, lqip, role, ariaLabel, ariaDescribedby,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);

  const hasIntersectionObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window;
  const shouldShowImage = isInView;
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
    if (priority || !containerRef.current) return;
    
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
  }, [priority, preloadMargin, hasIntersectionObserver]);

  // Check image load status for responsive images
  useEffect(() => {
    if (!isInView) return;
    
    const checkImageStatus = () => {
      const image = imageRef.current;
      return image?.complete && image.naturalWidth > 0 && (setIsLoaded(true), true);
    };
    
    if (checkImageStatus()) return;
    
    const intervalId = setInterval(checkImageStatus, 100);
    const timeoutId = setTimeout(() => clearInterval(intervalId), 5000);
    return () => (clearInterval(intervalId), clearTimeout(timeoutId));
  }, [isInView, src, srcSet]);

  const containerStyle = {
    width, height,
    ...(aspectRatio && { aspectRatio: String(aspectRatio) }),
    ...style,
  };

  const fadeStyle = (loaded: boolean) => fadeIn 
    ? { opacity: loaded ? 1 : 0, transition: `opacity ${fadeInDuration}ms ease-in-out` }
    : { opacity: 1 };

  const wrapperClass = `LazyPicture-wrapper${className ? ' ' + className : ''}`;
  const placeholderClass = `LazyImage-placeholder stack-item${fadeIn ? ' LazyImage-fade' : ''}`;
  const imageClass = `LazyImage-img${fadeIn ? ' LazyImage-fade' : ''}`;

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => (setIsLoaded(true), onLoad?.(event));
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
    
    const shouldShowPlaceholder = !blurhash && !isLoaded && (lqip || (placeholderBlur && placeholder));
    if (shouldShowPlaceholder) {
      return (
        <img
          src={lqip || placeholder}
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

  const renderPicture = () => shouldShowImage && (
    <picture className="stack-item" style={{ width: '100%', height: '100%' }}>
      {srcSet && <source srcSet={srcSet} sizes={sizes} />}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        srcSet={srcSet}
        sizes={sizes}
        loading={imageLoading}
        onLoad={handleLoad}
        onError={handleError}
        className={imageClass}
        style={fadeStyle(isLoaded)}
        role={role}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
      />
    </picture>
  );

  return (
    <div ref={containerRef} className={wrapperClass} style={containerStyle}>
      <div className="grid-stack">
        {renderFallback() || (
          <>
            {renderPlaceholder()}
            {renderPicture()}
          </>
        )}
      </div>
    </div>
  );
}
