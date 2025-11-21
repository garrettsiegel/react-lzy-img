import type { CSSProperties, ReactNode } from 'react';
import { BlurhashCanvas, PlaceholderImage } from './PlaceholderComponents';
import { CSS_CLASSES } from './constants';

/**
 * Configuration for rendering placeholder content
 */
interface PlaceholderConfig {
  /** Blurhash string for generating blurred placeholder */
  blurhash?: string;
  /** Low Quality Image Placeholder (LQIP) source URL */
  lqip?: string;
  /** General placeholder image source URL */
  placeholder?: string;
  /** Whether the image has loaded */
  isLoaded: boolean;
  /** CSS class name for the placeholder element */
  className: string;
  /** Style function that returns fade styles based on loaded state */
  fadeStyle: (loaded: boolean) => CSSProperties;
  /** Whether to show placeholder with blur effect (used by LazyPicture) */
  placeholderBlur?: boolean;
}

/**
 * Renders the appropriate placeholder component based on available options.
 * Prioritizes blurhash over LQIP/placeholder images.
 * 
 * @param config - Configuration object for placeholder rendering
 * @returns ReactNode representing the placeholder, or null if no placeholder should be shown
 */
export function renderPlaceholder(config: PlaceholderConfig): ReactNode {
  const { blurhash, lqip, placeholder, isLoaded, className, fadeStyle, placeholderBlur } = config;

  // Don't render placeholder if image is already loaded
  if (isLoaded) {
    return null;
  }

  // Priority 1: Blurhash placeholder
  if (blurhash) {
    return (
      <BlurhashCanvas
        blurhash={blurhash}
        isLoaded={isLoaded}
        className={className}
        fadeStyle={fadeStyle(false)}
      />
    );
  }

  // Priority 2: LQIP or standard placeholder
  const placeholderSrc = lqip || placeholder;
  if (placeholderSrc) {
    // For LazyPicture, check placeholderBlur flag when using standard placeholder
    const shouldShow = lqip || (placeholderBlur && placeholder);
    if (shouldShow) {
      return (
        <PlaceholderImage
          src={placeholderSrc}
          className={className}
          fadeStyle={fadeStyle(false)}
        />
      );
    }
  }

  return null;
}

/**
 * Renders fallback content when image loading fails
 */
interface FallbackConfig {
  /** Whether there was an error loading the image */
  hasError: boolean;
  /** Custom fallback content (string or ReactNode) */
  fallback?: ReactNode | string;
}

/**
 * Renders fallback content for failed image loads
 * 
 * @param config - Configuration for fallback rendering
 * @returns ReactNode representing the fallback content, or null if no error
 */
export function renderFallback(config: FallbackConfig): ReactNode {
  const { hasError, fallback } = config;

  if (!hasError) return null;

  if (typeof fallback === 'string') {
    return <div className={CSS_CLASSES.FALLBACK}>{fallback}</div>;
  }

  return fallback || <div className={CSS_CLASSES.FALLBACK}>Image failed to load.</div>;
}