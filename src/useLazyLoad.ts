import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export interface UseLazyLoadOptions {
  root?: Element | null;
  preloadMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function useLazyLoad<T extends HTMLElement = HTMLElement>(
  options: UseLazyLoadOptions = {}
): [RefObject<T>, boolean] {
  const elementRef = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const {
    root = null,
    preloadMargin = '200px',
    threshold = 0,
    once = true,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const hasIntersectionObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window;
    let observer: IntersectionObserver | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (hasIntersectionObserver) {
      const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once !== false) {
            observer?.disconnect();
          }
        } else if (once === false) {
          setIsInView(false);
        }
      };

      observer = new IntersectionObserver(handleIntersection, {
        root,
        rootMargin: preloadMargin,
        threshold,
      });

      observer.observe(element);
    } else {
      timeoutId = setTimeout(() => setIsInView(true), 0);
    }

    return () => {
      observer?.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [root, preloadMargin, threshold, once]);

  return [elementRef as RefObject<T>, isInView];
}

export interface UseLazyImageOptions extends UseLazyLoadOptions {
  src: string;
  placeholderSrc?: string;
}

export function useLazyImage(options: UseLazyImageOptions): [RefObject<HTMLImageElement>, string] {
  const { src, placeholderSrc, ...lazyOptions } = options;
  const [imageRef, isInView] = useLazyLoad<HTMLImageElement>(lazyOptions);
  const [imageSrc, setImageSrc] = useState(placeholderSrc || '');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isInView) {
        setImageSrc(src);
      } else {
        setImageSrc(placeholderSrc || '');
      }
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isInView, src, placeholderSrc]);

  return [imageRef, imageSrc];
}
