import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import './injectStyle';
import { useLazyLoad } from './useLazyLoad';
import { BlurhashCanvas, PlaceholderImage } from './PlaceholderComponents';
import { DEFAULT_FADE_DURATION, DEFAULT_PRELOAD_MARGIN, CSS_CLASSES } from './constants';
import type { LazyImageProps } from './types';

export default function LazyImage(props: LazyImageProps) {
  const {
    src,
    alt,
    placeholder,
    fadeIn = true,
    fadeInDuration = DEFAULT_FADE_DURATION,
    className = '',
    width,
    height,
    aspectRatio,
    style = {},
    forceVisible = false,
    fallback,
    blurhash,
    lqip,
    preloadMargin = DEFAULT_PRELOAD_MARGIN,
    priority = false,
    ariaLabel,
    ariaDescribedby,
    loading: loadingProp,
    onLoad,
    onError,
    ...imageProps
  } = props;

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

  const containerStyle = {
    width,
    height,
    ...(aspectRatio && { aspectRatio: String(aspectRatio) }),
    ...style,
  };

  const fadeStyle = (loaded: boolean) => (fadeIn
    ? { opacity: loaded ? 1 : 0, transition: `opacity ${fadeInDuration}ms ease-in-out` }
    : { opacity: 1 });

  const wrapperClass = `${CSS_CLASSES.WRAPPER}${className ? ' ' + className : ''}`;
  const placeholderClass = `${CSS_CLASSES.PLACEHOLDER} ${CSS_CLASSES.STACK_ITEM}${fadeIn ? ` ${CSS_CLASSES.FADE}` : ''}`;
  const imageClass = `${CSS_CLASSES.IMAGE} ${CSS_CLASSES.STACK_ITEM}${fadeIn ? ` ${CSS_CLASSES.FADE}` : ''}`;

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
        <BlurhashCanvas
          blurhash={blurhash}
          isLoaded={isLoaded}
          className={placeholderClass}
          fadeStyle={fadeStyle(false)}
        />
      );
    }

    const placeholderSrc = lqip || placeholder;
    if (placeholderSrc && !isLoaded) {
      return (
        <PlaceholderImage
          src={placeholderSrc}
          className={placeholderClass}
          fadeStyle={fadeStyle(false)}
        />
      );
    }

    return null;
  };

  const renderFallback = () => {
    if (!hasError) return null;
    if (typeof fallback === 'string') {
      return <div className={CSS_CLASSES.FALLBACK}>{fallback}</div>;
    }
    return fallback || <div className={CSS_CLASSES.FALLBACK}>Image failed to load.</div>;
  };

  const renderImage = () => shouldShowImage && (
    <img
      {...imageProps}
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
      <div className={CSS_CLASSES.GRID_STACK}>
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
