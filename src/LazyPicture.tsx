import { useRef, useState, useEffect } from 'react';
import type { SyntheticEvent } from 'react';
import { decode } from 'blurhash';
import './injectStyle';
import { useLazyLoad } from './useLazyLoad';
import type { LazyPictureProps as Props } from './types';

export default function LazyPicture(props: Props) {
  const {
    src,
    alt,
    srcSet,
    sizes,
    placeholder,
    placeholderBlur = false,
    aspectRatio,
    fadeIn = true,
    fadeInDuration = 300,
    priority = false,
    forceVisible = false,
    className = '',
    width,
    height,
    style = {},
    preloadMargin = '200px',
    fallback,
    blurhash,
    lqip,
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
  const assetKey = [src, srcSet ?? '', sizes ?? ''].join('|');
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [erroredKey, setErroredKey] = useState<string | null>(null);
  const isLoaded = loadedKey === assetKey;
  const hasError = erroredKey === assetKey;
  const shouldForceVisible = forceVisible || priority;
  const shouldShowImage = shouldForceVisible || observedInView || isLoaded;
  const imageLoading = loadingProp ?? (priority ? 'eager' : 'lazy');

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

  const containerStyle = {
    width,
    height,
    ...(aspectRatio && { aspectRatio: String(aspectRatio) }),
    ...style,
  };

  const fadeStyle = (loaded: boolean) => (fadeIn
    ? { opacity: loaded ? 1 : 0, transition: `opacity ${fadeInDuration}ms ease-in-out` }
    : { opacity: 1 });

  const wrapperClass = `LazyPicture-wrapper${className ? ' ' + className : ''}`;
  const placeholderClass = `LazyImage-placeholder stack-item${fadeIn ? ' LazyImage-fade' : ''}`;
  const imageClass = `LazyImage-img stack-item${fadeIn ? ' LazyImage-fade' : ''}`;

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setLoadedKey(assetKey);
    setErroredKey(null);
    onLoad?.(event);
  };

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setErroredKey(assetKey);
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
        {...imgProps}
        src={src}
        alt={alt}
        srcSet={srcSet}
        sizes={sizes}
        loading={imageLoading}
        onLoad={handleLoad}
        onError={handleError}
        className={imageClass}
        style={fadeStyle(isLoaded)}
        {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
        {...(ariaDescribedby ? { 'aria-describedby': ariaDescribedby } : {})}
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
