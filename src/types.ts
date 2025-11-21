import type {
  CSSProperties,
  ImgHTMLAttributes,
  ReactNode,
  SyntheticEvent,
} from 'react';

type WrappedImgAttributes = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'className' | 'style' | 'width' | 'height' | 'loading' | 'onLoad' | 'onError'
>;

export interface LazyImageProps extends WrappedImgAttributes {
  src: string;
  alt: string;
  placeholder?: string;
  fadeIn?: boolean;
  fadeInDuration?: number;
  className?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  style?: CSSProperties;
  forceVisible?: boolean;
  fallback?: ReactNode | string;
  blurhash?: string;
  lqip?: string;
  preloadMargin?: string;
  priority?: boolean;
  ariaLabel?: string;
  ariaDescribedby?: string;
  loading?: ImgHTMLAttributes<HTMLImageElement>['loading'];
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void;
}

export interface LazyPictureProps extends WrappedImgAttributes {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  placeholder?: string;
  placeholderBlur?: boolean;
  aspectRatio?: number;
  fadeIn?: boolean;
  fadeInDuration?: number;
  priority?: boolean;
  forceVisible?: boolean;
  className?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
  preloadMargin?: string;
  fallback?: ReactNode | string;
  blurhash?: string;
  lqip?: string;
  ariaLabel?: string;
  ariaDescribedby?: string;
  loading?: ImgHTMLAttributes<HTMLImageElement>['loading'];
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void;
}

export type Props = LazyImageProps;