import { useState, useRef, useEffect } from 'react';

/**
 * Hook for lazy loading images using IntersectionObserver
 * @param preloadMargin - Margin around viewport to start loading images (default: 200px)
 * @returns Tuple of [ref, isInView] - ref to attach to element, boolean indicating if element is in view
 */
export function useLazyLoad(preloadMargin = '200px') {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(() => 
    typeof window === 'undefined' || !('IntersectionObserver' in window)
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { rootMargin: preloadMargin }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [preloadMargin, isInView]);

  return [ref, isInView] as const;
}
