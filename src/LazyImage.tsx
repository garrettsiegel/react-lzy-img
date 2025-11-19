import { useRef, useState, useEffect } from 'react';
import './injectStyle';
import type { Props } from './types';
export default function LazyImage(props: Props) {
  const {
    src,
    alt,
    placeholder,
    fadeIn = true,
    fadeInDuration = 300,
    className = '',
    width,
    height,
    aspectRatio,
    style = {},
    forceVisible = false,
    onLoad,
    rootMargin = '200px',
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(forceVisible);

  // Native lazy fallback: if IntersectionObserver is not available, always show image with loading="lazy"
  const hasNativeLazy = typeof window !== 'undefined' && !('IntersectionObserver' in window);

  useEffect(() => {
    if (forceVisible) return setIsInView(true);
    if (!ref.current) return;
    if (hasNativeLazy) return setIsInView(true);
    const obs = new window.IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsInView(true); obs.disconnect(); }
    }, { rootMargin });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [forceVisible, rootMargin, hasNativeLazy]);

  // Compose sizing style
  const aspect = aspectRatio ? { aspectRatio: `${aspectRatio}` } : {};
  const sizeStyle = {
    width: width ? width : undefined,
    height: height ? height : undefined,
    ...aspect,
    ...style,
  };

  // Compose fade style
  const fadeStyle = (loaded: boolean) =>
    fadeIn
      ? {
          opacity: loaded ? 1 : 0,
          transition: `opacity ${fadeInDuration}ms ease-in-out`,
        }
      : { opacity: 1 };

  // If native lazy fallback, always show image with loading="lazy"
  if (hasNativeLazy) {
    return (
      <div className={`LazyImage-wrapper${className ? ' ' + className : ''}`} style={sizeStyle}>
        <div className="grid-stack">
          {placeholder && !isLoaded && (
            <img
              src={placeholder}
              alt=""
              aria-hidden="true"
              className={`LazyImage-placeholder stack-item${fadeIn ? ' LazyImage-fade' : ''}`}
              style={fadeStyle(false)}
            />
          )}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => { setIsLoaded(true); onLoad?.(); }}
            className={`LazyImage-img stack-item${fadeIn ? ' LazyImage-fade' : ''}`}
            style={fadeStyle(isLoaded)}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`LazyImage-wrapper${className ? ' ' + className : ''}`} style={sizeStyle}>
      <div className="grid-stack">
        {placeholder && !isLoaded && (
          <img
            src={placeholder}
            alt=""
            aria-hidden="true"
            className={`LazyImage-placeholder stack-item${fadeIn ? ' LazyImage-fade' : ''}`}
            style={fadeStyle(false)}
          />
        )}
        {isInView && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => { setIsLoaded(true); onLoad?.(); }}
            className={`LazyImage-img stack-item${fadeIn ? ' LazyImage-fade' : ''}`}
            style={fadeStyle(isLoaded)}
          />
        )}
      </div>
    </div>
  );
}
