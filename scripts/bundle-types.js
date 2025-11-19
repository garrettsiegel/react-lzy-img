#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the types from source files and create a bundled declaration
const typesContent = `import React, { RefObject } from 'react';

// Component prop types
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
  blurhash?: string;
  lqip?: string;
  preloadMargin?: string;
  priority?: boolean;
  role?: string;
  ariaLabel?: string;
  ariaDescribedby?: string;
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
  preloadMargin?: string;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  fallback?: React.ReactNode | string;
  blurhash?: string;
  lqip?: string;
  role?: string;
  ariaLabel?: string;
  ariaDescribedby?: string;
}

// Hook option types
export interface UseLazyLoadOptions {
  root?: Element | null;
  preloadMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export interface UseLazyImageOptions extends UseLazyLoadOptions {
  src: string;
  placeholderSrc?: string;
}

// Component declarations (exported as default in source, imported as named exports)
declare const LazyImage: React.FC<Props>;
declare const LazyPicture: React.FC<LazyPictureProps>;

// Hook declarations
export declare function useLazyLoad<T extends HTMLElement = HTMLElement>(
  options?: UseLazyLoadOptions
): [RefObject<T>, boolean];

export declare function useLazyImage(
  options: UseLazyImageOptions
): [RefObject<HTMLImageElement>, string];

// Named exports (matching src/index.ts)
export { LazyImage, LazyPicture };

// Type aliases for convenience
export type LazyImageProps = Props;
`;

// Write the bundled types
writeFileSync(join(__dirname, '../dist/index.d.ts'), typesContent);
console.log('✓ Bundled TypeScript declarations created');