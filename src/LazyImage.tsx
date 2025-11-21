import { useRef, useState, useEffect } from 'react';
import type { SyntheticEvent } from 'react';
import { decode } from 'blurhash';
import './injectStyle';
import { useLazyLoad } from './useLazyLoad';
import type { LazyImageProps } from './types';

export default function LazyImage(props: LazyImageProps) {
  const {
    src,
    alt,
    placeholder,
    fadeIn = true,
    fadeInDuration = 300,
    className = '',
    width,
    height,
    aspectRatio,
    style = {},
    forceVisible = false,
    fallback,
    blurhash,
    lqip,
    preloadMargin = '200px',
    priority = false,
    ariaLabel,
    ariaDescribedby,
    loading: loadingProp,
    onLoad,
    onError,
    ...imgProps
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [containerRef, observedInView] = useLazyLoad<HTMLDivElement>({
    preloadMargin,
  });
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [erroredSrc, setErroredSrc] = useState<string | null>(null);
  const isLoaded = loadedSrc === src;
  const hasError = erroredSrc === src;
  const shouldForceVisible = forceVisible || priority;
  const shouldShowImage = shouldForceVisible || observedInView || isLoaded;
  const imageLoading = loadingProp ?? (priority ? 'eager' : 'lazy');

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
      // Ignore blurhash decode failures
    }
  }, [blurhash, isLoaded]);

  const containerStyle = {
    width,
    height,
    ...(aspectRatio && { aspectRatio: String(aspectRatio) }),
    ...style,
  };

  const fadeStyle = (loaded: boolean) => (fadeIn
    ? { opacity: loaded ? 1 : 0, transition: `opacity ${fadeInDuration}ms ease-in-out` }
    : { opacity: 1 });

  const wrapperClass = `LazyImage-wrapper${className ? ' ' + className : ''}`;
  const placeholderClass = `LazyImage-placeholder stack-item${fadeIn ? ' LazyImage-fade' : ''}`;
  const imageClass = `LazyImage-img stack-item${fadeIn ? ' LazyImage-fade' : ''}`;

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setLoadedSrc(src);
    setErroredSrc(null);
    onLoad?.(event);
  };

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setErroredSrc(src);
    onError?.(event);
  };

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
      {...imgProps}
      src={src}
      alt={alt}
      loading={imageLoading}
      onLoad={handleLoad}
      onError={handleError}
      className={imageClass}
      style={fadeStyle(isLoaded)}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
      {...(ariaDescribedby ? { 'aria-describedby': ariaDescribedby } : {})}
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
