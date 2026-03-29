import { useState, useRef, useEffect } from 'react';
import type { RefObject } from 'react';
import { observeElement, unobserveElement } from '../utils/observerPool';

export type UseLazyLoadReturn = readonly [RefObject<HTMLDivElement | null>, boolean];

// Hook for lazy loading with IntersectionObserver.
export function useLazyLoad(preloadMargin = '200px'): UseLazyLoadReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(() => 
    typeof window === 'undefined' || !('IntersectionObserver' in window)
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || isInView) return;

    observeElement(element, preloadMargin, () => {
      setIsInView(true);
    });

    return () => {
      unobserveElement(element, preloadMargin);
    };
  }, [preloadMargin, isInView]);

  return [ref, isInView] as const;
}
