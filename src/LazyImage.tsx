import { useState } from 'react';
import type { SyntheticEvent, CSSProperties } from 'react';
import './injectStyle';
import { useLazyLoad } from './useLazyLoad';
import { renderPlaceholder, renderFallback } from './placeholderUtils';
import { DEFAULT_FADE_DURATION, DEFAULT_PRELOAD_MARGIN, CSS_CLASSES } from './constants';
import type { LazyImageProps } from './types';

/**
 * LazyImage component for responsive lazy loading with placeholder support.
 * Supports blurhash, LQIP, and standard placeholder images with smooth fade transitions.
 * 
 * @param props - Configuration props for the lazy image component
 * @returns A div container with lazy-loaded image and placeholder handling
 */
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

  // Hooks for lazy loading and state management
  const [containerRef, observedInView] = useLazyLoad<HTMLDivElement>({ preloadMargin });
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [erroredSrc, setErroredSrc] = useState<string | null>(null);
  
  // Computed state
  const loadState = useImageLoadState(src, loadedSrc, erroredSrc);
  const visibility = useImageVisibility(forceVisible, priority, observedInView, loadState.isLoaded);
  const styles = useImageStyles(fadeIn, fadeInDuration, width, height, aspectRatio, style);
  const classes = useImageClasses(className);

  // Event handlers
  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setLoadedSrc(src);
    setErroredSrc(null);
    onLoad?.(event);
  };

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setErroredSrc(src);
    onError?.(event);
  };

  return (
    <div ref={containerRef} className={classes.wrapper} style={styles.container}>
      <div className={CSS_CLASSES.SHARED.GRID_STACK}>
        {renderFallback({ hasError: loadState.hasError, fallback }) || (
          <>
            {renderPlaceholder({
              blurhash,
              lqip,
              placeholder,
              isLoaded: loadState.isLoaded,
              className: classes.placeholder,
              fadeStyle: styles.fadeStyle,
            })}
            {visibility.shouldShowImage && (
              <img
                {...imageProps}
                src={src}
                alt={alt}
                loading={loadingProp ?? (priority ? 'eager' : 'lazy')}
                onLoad={handleLoad}
                onError={handleError}
                className={classes.image}
                style={styles.fadeStyle(loadState.isLoaded)}
                {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
                {...(ariaDescribedby ? { 'aria-describedby': ariaDescribedby } : {})}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Hook for managing image load state
 */
function useImageLoadState(src: string, loadedSrc: string | null, erroredSrc: string | null) {
  return {
    isLoaded: loadedSrc === src,
    hasError: erroredSrc === src,
  };
}

/**
 * Hook for determining image visibility
 */
function useImageVisibility(
  forceVisible: boolean,
  priority: boolean,
  observedInView: boolean,
  isLoaded: boolean
) {
  const shouldForceVisible = forceVisible || priority;
  return {
    shouldShowImage: shouldForceVisible || observedInView || isLoaded,
  };
}

/**
 * Hook for managing image styles and fade effects
 */
function useImageStyles(
  fadeIn: boolean,
  fadeInDuration: number,
  width?: number,
  height?: number,
  aspectRatio?: number,
  style: CSSProperties = {}
) {
  const fadeStyle = (loaded: boolean): CSSProperties => (fadeIn
    ? { opacity: loaded ? 1 : 0, transition: `opacity ${fadeInDuration}ms ease-in-out` }
    : { opacity: 1 });

  const container: CSSProperties = {
    width,
    height,
    ...(aspectRatio && { aspectRatio: String(aspectRatio) }),
    ...style,
  };

  return { fadeStyle, container };
}

/**
 * Hook for managing CSS class names
 */
function useImageClasses(className: string) {
  const wrapper = `${CSS_CLASSES.LAZY_IMAGE.WRAPPER}${className ? ' ' + className : ''}`;
  const placeholder = `${CSS_CLASSES.LAZY_IMAGE.PLACEHOLDER} ${CSS_CLASSES.SHARED.STACK_ITEM}`;
  const image = `${CSS_CLASSES.LAZY_IMAGE.IMAGE} ${CSS_CLASSES.SHARED.STACK_ITEM}`;

  return { wrapper, placeholder, image };
}
