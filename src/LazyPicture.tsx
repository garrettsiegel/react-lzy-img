import { useState } from 'react';
import type { SyntheticEvent, CSSProperties } from 'react';
import './injectStyle';
import { useLazyLoad } from './useLazyLoad';
import { renderPlaceholder, renderFallback } from './placeholderUtils';
import { DEFAULT_FADE_DURATION, DEFAULT_PRELOAD_MARGIN, CSS_CLASSES } from './constants';
import type { LazyPictureProps } from './types';

/**
 * LazyPicture component for responsive lazy loading with advanced picture element support.
 * Supports srcset, sizes, blurhash, LQIP, and standard placeholder images with smooth fade transitions.
 * 
 * @param props - Configuration props for the lazy picture component
 * @returns A div container with lazy-loaded picture element and placeholder handling
 */
export default function LazyPicture(props: LazyPictureProps) {
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

  // Hooks for lazy loading and state management
  const [containerRef, observedInView] = useLazyLoad<HTMLDivElement>({ preloadMargin });
  const assetKey = usePictureAssetKey(src, srcSet, sizes);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [erroredKey, setErroredKey] = useState<string | null>(null);
  
  // Computed state
  const loadState = usePictureLoadState(assetKey, loadedKey, erroredKey);
  const visibility = usePictureVisibility(forceVisible, priority, observedInView, loadState.isLoaded);
  const styles = usePictureStyles(fadeIn, fadeInDuration, width, height, aspectRatio, style);
  const classes = usePictureClasses(className);

  // Event handlers
  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setLoadedKey(assetKey);
    setErroredKey(null);
    onLoad?.(event);
  };

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setErroredKey(assetKey);
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
              placeholderBlur,
            })}
            {visibility.shouldShowImage && (
              <picture className={CSS_CLASSES.SHARED.STACK_ITEM} style={{ width: '100%', height: '100%' }}>
                {srcSet && <source srcSet={srcSet} sizes={sizes} />}
                <img
                  {...imageProps}
                  src={src}
                  alt={alt}
                  srcSet={srcSet}
                  sizes={sizes}
                  loading={loadingProp ?? (priority ? 'eager' : 'lazy')}
                  onLoad={handleLoad}
                  onError={handleError}
                  className={classes.image}
                  style={styles.fadeStyle(loadState.isLoaded)}
                  {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
                  {...(ariaDescribedby ? { 'aria-describedby': ariaDescribedby } : {})}
                />
              </picture>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Hook for creating a unique asset key for picture elements with multiple sources
 */
function usePictureAssetKey(src: string, srcSet?: string, sizes?: string): string {
  return [src, srcSet ?? '', sizes ?? ''].join('|');
}

/**
 * Hook for managing picture load state with complex asset keys
 */
function usePictureLoadState(assetKey: string, loadedKey: string | null, erroredKey: string | null) {
  return {
    isLoaded: loadedKey === assetKey,
    hasError: erroredKey === assetKey,
  };
}

/**
 * Hook for determining picture visibility
 */
function usePictureVisibility(
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
 * Hook for managing picture styles and fade effects
 */
function usePictureStyles(
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
 * Hook for managing CSS class names specific to LazyPicture
 */
function usePictureClasses(className: string) {
  const wrapper = `${CSS_CLASSES.LAZY_PICTURE.WRAPPER}${className ? ' ' + className : ''}`;
  const placeholder = `${CSS_CLASSES.LAZY_PICTURE.PLACEHOLDER} ${CSS_CLASSES.SHARED.STACK_ITEM}`;
  const image = `${CSS_CLASSES.LAZY_PICTURE.IMAGE} ${CSS_CLASSES.SHARED.STACK_ITEM}`;

  return { wrapper, placeholder, image };
}
