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

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const hasIntersectionObserver = 'IntersectionObserver' in window;
    
    if (hasIntersectionObserver) {
      const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
        const shouldSetInView = entry.isIntersecting;
        const shouldDisconnect = options.once !== false;
        
        if (shouldSetInView) {
          setIsInView(true);
          if (shouldDisconnect) observer.disconnect();
        } else if (options.once === false) {
          setIsInView(false);
        }
      };

      const observer = new IntersectionObserver(handleIntersection, {
        root: options.root || null,
        rootMargin: options.preloadMargin || '200px',
        threshold: options.threshold ?? 0,
      });

      observer.observe(element);
      return () => observer.disconnect();
    } else {
      setTimeout(() => setIsInView(true), 0);
    }
  }, [options.root, options.preloadMargin, options.threshold, options.once]);

  return [elementRef as RefObject<T>, isInView];
}

export interface UseLazyImageOptions extends UseLazyLoadOptions {
  src: string;
  placeholderSrc?: string;
}

export function useLazyImage(options: UseLazyImageOptions): [RefObject<HTMLImageElement>, string] {
  const [imageRef, isInView] = useLazyLoad<HTMLImageElement>(options);
  const [imageSrc, setImageSrc] = useState(options.placeholderSrc || '');

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setImageSrc(options.src), 0);
    }
  }, [isInView, options.src]);

  return [imageRef, imageSrc];
}
