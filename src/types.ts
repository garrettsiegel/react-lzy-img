export type Props = {
  src: string;
  alt: string;
  placeholder?: string;
  fadeIn?: boolean;
  fadeInDuration?: number;
  className?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  style?: React.CSSProperties;
  forceVisible?: boolean;
  onLoad?: () => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  fallback?: React.ReactNode | string;
  rootMargin?: string;
};

export interface LazyPictureProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet' | 'sizes'> {
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
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  rootMargin?: string;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  fallback?: React.ReactNode | string;
}