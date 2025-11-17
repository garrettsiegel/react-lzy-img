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
}