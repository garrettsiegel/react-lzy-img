import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { DEFAULT_PRELOAD_MARGIN, INTERSECTION_OBSERVER_THRESHOLD } from './constants';

/**
 * Configuration options for the useLazyLoad hook
 */
export interface UseLazyLoadOptions {
  /** Root element for intersection observer (null = viewport) */
  root?: Element | null;
  /** Margin around root to trigger early loading (default: "200px") */
  preloadMargin?: string;
  /** Threshold percentage for intersection (0-1, default: 0) */
  threshold?: number | number[];
  /** Whether to only trigger once or continuously observe (default: true) */
  once?: boolean;
}

/**
 * Hook for lazy loading elements using Intersection Observer API.
 * Provides a ref to attach to an element and a boolean indicating if it's in view.
 * 
 * @param options - Configuration options for lazy loading behavior
 * @returns Tuple of [elementRef, isInView] where:
 *   - elementRef: React ref to attach to the target element
 *   - isInView: Boolean indicating if element is visible or should be loaded
 * 
 * @example
 * ```tsx
 * const [ref, isInView] = useLazyLoad({ preloadMargin: "100px" });
 * 
 * return (
 *   <div ref={ref}>
 *     {isInView && <ExpensiveComponent />}
 *   </div>
 * );
 * ```
 */
export function useLazyLoad<T extends HTMLElement = HTMLElement>(
  options: UseLazyLoadOptions = {}
): [RefObject<T>, boolean] {
  const elementRef = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const {
    root = null,
    preloadMargin = DEFAULT_PRELOAD_MARGIN,
    threshold = INTERSECTION_OBSERVER_THRESHOLD,
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
      // Fallback for environments without IntersectionObserver
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

/**
 * Configuration options for the useLazyImage hook (extends useLazyLoad options)
 */
export interface UseLazyImageOptions extends UseLazyLoadOptions {
  /** Main image source URL to load when in view */
  src: string;
  /** Optional placeholder image URL to show while not in view */
  placeholderSrc?: string;
}

/**
 * Hook for lazy loading images with placeholder support.
 * Manages image source switching based on intersection observer visibility.
 * 
 * @param options - Configuration including image sources and lazy load behavior
 * @returns Tuple of [imageRef, currentSrc] where:
 *   - imageRef: React ref to attach to the img element
 *   - currentSrc: Current image source (placeholder or main image)
 * 
 * @example
 * ```tsx
 * const [ref, src] = useLazyImage({
 *   src: "high-res-image.jpg",
 *   placeholderSrc: "low-res-placeholder.jpg",
 *   preloadMargin: "50px"
 * });
 * 
 * return <img ref={ref} src={src} alt="Lazy loaded image" />;
 * ```
 */
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
