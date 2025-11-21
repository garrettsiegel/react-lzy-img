import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import './injectStyle';
import { useLazyLoad } from './useLazyLoad';
import { BlurhashCanvas, PlaceholderImage } from './PlaceholderComponents';
import { DEFAULT_FADE_DURATION, DEFAULT_PRELOAD_MARGIN, CSS_CLASSES } from './constants';
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
    fadeInDuration = DEFAULT_FADE_DURATION,
    priority = false,
    forceVisible = false,
    className = '',
    width,
    height,
    style = {},
    preloadMargin = DEFAULT_PRELOAD_MARGIN,
    fallback,
    blurhash,
    lqip,
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
  const assetKey = [src, srcSet ?? '', sizes ?? ''].join('|');
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [erroredKey, setErroredKey] = useState<string | null>(null);
  
  const isLoaded = loadedKey === assetKey;
  const hasError = erroredKey === assetKey;
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
        <BlurhashCanvas
          blurhash={blurhash}
          isLoaded={isLoaded}
          className={placeholderClass}
          fadeStyle={fadeStyle(false)}
        />
      );
    }

    const shouldShowPlaceholder = !blurhash && !isLoaded && (lqip || (placeholderBlur && placeholder));
    if (shouldShowPlaceholder) {
      return (
        <PlaceholderImage
          src={lqip || placeholder!}
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

  const renderPicture = () => shouldShowImage && (
    <picture className={CSS_CLASSES.STACK_ITEM} style={{ width: '100%', height: '100%' }}>
      {srcSet && <source srcSet={srcSet} sizes={sizes} />}
      <img
        {...imageProps}
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
      <div className={CSS_CLASSES.GRID_STACK}>
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
