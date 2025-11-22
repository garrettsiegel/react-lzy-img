import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

/**
 * Options for useLazyLoad hook
 */
export interface UseLazyLoadOptions {
  /** Root element for intersection observer (null = viewport) */
  root?: Element | null;
  /** Margin around root to trigger early loading */
  preloadMargin?: string;
  /** Intersection threshold (0-1) */
  threshold?: number | number[];
  /** Whether to only trigger once */
  once?: boolean;
}

/**
 * Hook for lazy loading elements using Intersection Observer API.
 * 
 * @param options Configuration options
 * @returns [elementRef, isInView] tuple
 * 
 * @example
 * ```tsx
 * const [ref, isInView] = useLazyLoad({ preloadMargin: "100px" });
 * return <div ref={ref}>{isInView && <ExpensiveComponent />}</div>;
 * ```
 */
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

    // Check if IntersectionObserver is available
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: show immediately
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        root,
        rootMargin: preloadMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [root, preloadMargin, threshold, once]);

  return [elementRef as RefObject<T>, isInView];
}
