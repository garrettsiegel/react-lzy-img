import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export interface UseLazyLoadOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function useLazyLoad<T extends HTMLElement = HTMLElement>(options: UseLazyLoadOptions = {}): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.once !== false) observer.disconnect();
        } else if (options.once === false) {
          setIsInView(false);
        }
      }, {
        root: options.root || null,
        rootMargin: options.rootMargin || '200px',
        threshold: options.threshold ?? 0,
      });
      observer.observe(node);
      return () => observer.disconnect();
    } else {
      setIsInView(true);
    }
  }, [options.root, options.rootMargin, options.threshold, options.once]);
  return [ref as RefObject<T>, isInView];
}

export interface UseLazyImageOptions extends UseLazyLoadOptions {
  src: string;
  placeholderSrc?: string;
}

export function useLazyImage(options: UseLazyImageOptions): [RefObject<HTMLImageElement>, string] {
  const [ref, isInView] = useLazyLoad<HTMLImageElement>(options);
  const [src, setSrc] = useState(options.placeholderSrc || '');
  useEffect(() => { if (isInView) setSrc(options.src); }, [isInView, options.src]);
  return [ref, src];
}
