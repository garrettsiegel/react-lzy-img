import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import type { ImgHTMLAttributes, CSSProperties, SyntheticEvent, ReactNode } from 'react';
import { useLazyLoad } from './hooks/useLazyLoad';
import { renderBlurhash, cleanupCanvas, type BlurhashResolution } from './utils/blurhash';

type FetchPriority = 'high' | 'low' | 'auto';

export interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'className' | 'style' | 'width' | 'height' | 'loading' | 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  placeholder?: string;
  blurhash?: string;
  blurhashResolution?: BlurhashResolution;
  lqip?: string;
  fadeIn?: boolean;
  fadeInDuration?: number;
  className?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  style?: CSSProperties;
  priority?: boolean;
  fetchPriority?: FetchPriority;
  preloadMargin?: string;
  fallback?: ReactNode | string;
  loading?: ImgHTMLAttributes<HTMLImageElement>['loading'];
  retryAttempts?: number;
  retryDelay?: number;
  retryBackoff?: boolean;
  onPlaceholderError?: () => void;
  loadingLabel?: string;
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void;
}

const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateAreas: '"stack"',
    placeItems: 'center',
  } as CSSProperties,
  item: {
    gridArea: 'stack',
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  placeholder: {
    filter: 'blur(1rem)',
    pointerEvents: 'none' as const,
  },
  fallback: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    color: '#6c757d',
    fontSize: '0.875rem',
    minHeight: '40px',
    padding: '8px 12px',
    textAlign: 'center' as const,
  },
  visuallyHidden: {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden' as const,
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap' as const,
    border: 0,
  },
};

const EMPTY_STYLE: CSSProperties = {};
const MAX_RETRY_ATTEMPTS = 10;

function withRetryParam(source: string, retryCount: number): string {
  if (retryCount <= 0) {
    return source;
  }

  const [baseWithQuery, hashFragment] = source.split('#');
  const [basePath, rawQuery = ''] = baseWithQuery.split('?');
  const searchParams = new URLSearchParams(rawQuery);
  searchParams.set('_retry', String(retryCount));

  const queryString = searchParams.toString();
  const withQuery = queryString ? `${basePath}?${queryString}` : basePath;
  return hashFragment ? `${withQuery}#${hashFragment}` : withQuery;
}

export function LazyImage({
  src,
  alt,
  srcSet,
  sizes,
  placeholder,
  blurhash,
  blurhashResolution = 32,
  lqip,
  fadeIn = true,
  fadeInDuration = 300,
  className = '',
  width,
  height,
  aspectRatio,
  style,
  priority = false,
  fetchPriority,
  preloadMargin = '200px',
  fallback,
  loading,
  retryAttempts = 0,
  retryDelay = 1000,
  retryBackoff = false,
  onPlaceholderError,
  loadingLabel,
  onLoad,
  onError,
  ...imageProps
}: LazyImageProps) {
  const [containerRef, isInView] = useLazyLoad(preloadMargin);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const normalizedRetryAttempts = Number.isFinite(retryAttempts)
    ? Math.min(Math.max(Math.floor(retryAttempts), 0), MAX_RETRY_ATTEMPTS)
    : 0;

  useEffect(() => {
    if (!blurhash || !canvasRef.current || isLoaded) {
      return;
    }

    const canvas = canvasRef.current;
    const rendered = renderBlurhash(canvas, blurhash, blurhashResolution);
    if (!rendered) {
      onPlaceholderError?.();
    }

    return () => {
      cleanupCanvas(canvas);
    };
  }, [blurhash, blurhashResolution, isLoaded, onPlaceholderError]);

  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  const shouldLoadImage = priority || isInView;
  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  const shouldAnimate = fadeIn && !prefersReducedMotion;

  const containerStyle: CSSProperties = {
    ...styles.wrapper,
    width,
    height,
    ...(aspectRatio && { aspectRatio }),
    ...(style ?? EMPTY_STYLE),
  };

  const imageStyle = {
    ...styles.item,
    ...(shouldAnimate
      ? {
          opacity: isLoaded ? 1 : 0,
          transition: `opacity ${fadeInDuration}ms ease-in-out`,
        }
      : {}),
  };

  const placeholderStyle = {
    ...styles.item,
    ...styles.placeholder,
    opacity: fadeIn ? 0.8 : 1,
  };

  const imageSrc = withRetryParam(src, retryCount);
  const resolvedFetchPriority = fetchPriority || (priority ? 'high' : undefined);
  const imageLoadingProps: ImgHTMLAttributes<HTMLImageElement> = {
    loading: loading || (priority ? 'eager' : 'lazy'),
    ...(resolvedFetchPriority ? { fetchPriority: resolvedFetchPriority } : {}),
  };

  const handleLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setIsLoaded(true);
      setHasError(false);
      setRetryCount(0);
      onLoad?.(event);
    },
    [onLoad]
  );

  const handleError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      if (retryCount < normalizedRetryAttempts) {
        const nextDelay = retryBackoff ? retryDelay * Math.pow(2, retryCount) : retryDelay;
        retryTimeoutRef.current = setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          setHasError(false);
        }, nextDelay);
        return;
      }

      setHasError(true);
      onError?.(event);
    },
    [retryCount, normalizedRetryAttempts, retryDelay, retryBackoff, onError]
  );

  if (hasError) {
    return (
      <div
        ref={containerRef}
        className={className}
        style={containerStyle}
        role="img"
        aria-label={`${alt} (failed to load${normalizedRetryAttempts > 0 ? ` after ${normalizedRetryAttempts} retries` : ''})`}
      >
        <div style={styles.fallback} role="alert">
          {fallback || 'Image failed to load'}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyle}
      role="img"
      aria-label={alt}
      aria-busy={!isLoaded && !hasError}
    >
      {loadingLabel && (
        <span role="status" aria-live="polite" aria-atomic="true" style={styles.visuallyHidden}>
          {!isLoaded && !hasError ? loadingLabel : ''}
        </span>
      )}

      {!isLoaded &&
        (blurhash ? (
          <canvas
            ref={canvasRef}
            width={blurhashResolution}
            height={blurhashResolution}
            aria-hidden="true"
            style={placeholderStyle}
          />
        ) : lqip || placeholder ? (
          <img src={lqip || placeholder} alt="" aria-hidden="true" style={placeholderStyle} />
        ) : null)}

      {shouldLoadImage &&
        (srcSet ? (
          <picture style={styles.item}>
            <source srcSet={srcSet} sizes={sizes} />
            <img
              {...imageProps}
              src={imageSrc}
              alt={alt}
              {...imageLoadingProps}
              onLoad={handleLoad}
              onError={handleError}
              style={imageStyle}
            />
          </picture>
        ) : (
          <img
            {...imageProps}
            src={imageSrc}
            alt={alt}
            {...imageLoadingProps}
            onLoad={handleLoad}
            onError={handleError}
            style={imageStyle}
          />
        ))}
    </div>
  );
}
