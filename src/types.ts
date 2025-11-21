import type {
  CSSProperties,
  ImgHTMLAttributes,
  ReactNode,
  SyntheticEvent,
} from 'react';

/**
 * Base HTML img attributes with excluded props that are handled by the lazy components
 */
type WrappedImgAttributes = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'className' | 'style' | 'width' | 'height' | 'loading' | 'onLoad' | 'onError'
>;

/**
 * Props for the LazyImage component - a simple lazy loading image with placeholder support
 */
export interface LazyImageProps extends WrappedImgAttributes {
  /** Source URL of the image to load */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** URL for standard placeholder image (lower priority than blurhash/lqip) */
  placeholder?: string;
  /** Whether to apply fade-in transition when image loads (default: true) */
  fadeIn?: boolean;
  /** Duration of fade-in animation in milliseconds (default: 300) */
  fadeInDuration?: number;
  /** Additional CSS class names to apply to the wrapper */
  className?: string;
  /** Fixed width in pixels or CSS units */
  width?: number;
  /** Fixed height in pixels or CSS units */
  height?: number;
  /** CSS aspect-ratio value (e.g., 16/9, 4/3) for responsive sizing */
  aspectRatio?: number;
  /** Custom CSS styles for the container */
  style?: CSSProperties;
  /** Force image to be visible without intersection observer (default: false) */
  forceVisible?: boolean;
  /** Custom fallback content when image fails to load */
  fallback?: ReactNode | string;
  /** Blurhash string for generating blurred placeholder */
  blurhash?: string;
  /** Low Quality Image Placeholder URL (higher priority than standard placeholder) */
  lqip?: string;
  /** Margin around viewport to trigger early loading (default: "200px") */
  preloadMargin?: string;
  /** High priority loading - loads immediately and uses eager loading (default: false) */
  priority?: boolean;
  /** Custom aria-label for accessibility */
  ariaLabel?: string;
  /** ID of element that describes the image */
  ariaDescribedby?: string;
  /** Native loading attribute ("lazy" | "eager") - auto-determined if not provided */
  loading?: ImgHTMLAttributes<HTMLImageElement>['loading'];
  /** Callback fired when image successfully loads */
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  /** Callback fired when image fails to load */
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * Props for the LazyPicture component - advanced lazy loading with responsive images and picture element
 */
export interface LazyPictureProps extends WrappedImgAttributes {
  /** Source URL of the image to load (fallback for picture element) */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** Responsive image source set for different screen sizes */
  srcSet?: string;
  /** Media queries that define when to use different images from srcSet */
  sizes?: string;
  /** URL for standard placeholder image */
  placeholder?: string;
  /** Whether to show placeholder with blur effect when using standard placeholder (default: false) */
  placeholderBlur?: boolean;
  /** CSS aspect-ratio value (e.g., 16/9, 4/3) for responsive sizing */
  aspectRatio?: number;
  /** Whether to apply fade-in transition when image loads (default: true) */
  fadeIn?: boolean;
  /** Duration of fade-in animation in milliseconds (default: 300) */
  fadeInDuration?: number;
  /** High priority loading - loads immediately and uses eager loading (default: false) */
  priority?: boolean;
  /** Force image to be visible without intersection observer (default: false) */
  forceVisible?: boolean;
  /** Additional CSS class names to apply to the wrapper */
  className?: string;
  /** Fixed width in pixels or CSS units */
  width?: number;
  /** Fixed height in pixels or CSS units */
  height?: number;
  /** Custom CSS styles for the container */
  style?: CSSProperties;
  /** Margin around viewport to trigger early loading (default: "200px") */
  preloadMargin?: string;
  /** Custom fallback content when image fails to load */
  fallback?: ReactNode | string;
  /** Blurhash string for generating blurred placeholder */
  blurhash?: string;
  /** Low Quality Image Placeholder URL (higher priority than standard placeholder) */
  lqip?: string;
  /** Custom aria-label for accessibility */
  ariaLabel?: string;
  /** ID of element that describes the image */
  ariaDescribedby?: string;
  /** Native loading attribute ("lazy" | "eager") - auto-determined if not provided */
  loading?: ImgHTMLAttributes<HTMLImageElement>['loading'];
  /** Callback fired when image successfully loads */
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  /** Callback fired when image fails to load */
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void;
}

