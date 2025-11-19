import { useRef, useState, useEffect } from 'react';
import './injectStyle';

import type { LazyPictureProps as Props } from './types';
export default function LazyPicture(props: Props) {
  const {
    src,
    alt,
    srcSet,
    sizes,
    placeholder,
    placeholderBlur = false,
    aspectRatio,
    fadeIn = true,
    fadeInDuration = 300,
    priority = false,
    className = '',
    width,
    height,
    style = {},
    rootMargin = '200px',
    onLoad,
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);

  // Native lazy fallback: if IntersectionObserver is not available, always show image with loading="lazy"
  const hasNativeLazy = typeof window !== 'undefined' && !('IntersectionObserver' in window);

  useEffect(() => {
    if (priority) return setIsInView(true);
    if (!ref.current) return;
    if (hasNativeLazy) return setIsInView(true);
    const obs = new window.IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsInView(true); obs.disconnect(); }
    }, { rootMargin });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [priority, rootMargin, hasNativeLazy]);

  useEffect(() => {
    if (!isInView) return;
    const check = () => {
      const img = imgRef.current;
      if (img && img.complete && img.naturalWidth > 0) {
        setIsLoaded(true);
        return true;
      }
      return false;
    };
    if (check()) return;
    const interval = setInterval(check, 100);
    const timeout = setTimeout(() => clearInterval(interval), 5000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [isInView, src, srcSet]);

  const aspect = aspectRatio ? { aspectRatio: `${aspectRatio}` } : {};

  // Compose sizing style
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
      <div className={`LazyPicture-wrapper${className ? ' ' + className : ''}`} style={sizeStyle}>
        <div className="grid-stack">
          <picture className="stack-item" style={{ width: '100%', height: '100%' }}>
            {srcSet && <source srcSet={srcSet} sizes={sizes} />}
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              srcSet={srcSet}
              sizes={sizes}
              loading={priority ? 'eager' : 'lazy'}
              onLoad={e => { setIsLoaded(true); onLoad?.(e); }}
              className={`LazyImage-img${fadeIn ? ' LazyImage-fade' : ''}`}
              style={fadeStyle(isLoaded)}
            />
          </picture>
          {placeholderBlur && placeholder && (
            <img
              src={placeholder}
              alt=""
              aria-hidden="true"
              className={`LazyImage-placeholder stack-item${fadeIn ? ' LazyImage-fade' : ''}`}
              style={fadeStyle(false)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`LazyPicture-wrapper${className ? ' ' + className : ''}`}
      style={sizeStyle}
    >
      <div className="grid-stack">
        {isInView && (
          <picture className="stack-item" style={{ width: '100%', height: '100%' }}>
            {srcSet && <source srcSet={srcSet} sizes={sizes} />}
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              srcSet={srcSet}
              sizes={sizes}
              loading={priority ? 'eager' : 'lazy'}
              onLoad={e => { setIsLoaded(true); onLoad?.(e); }}
              className={`LazyImage-img${fadeIn ? ' LazyImage-fade' : ''}`}
              style={fadeStyle(isLoaded)}
            />
          </picture>
        )}
        {placeholderBlur && placeholder && (
          <img
            src={placeholder}
            alt=""
            aria-hidden="true"
            className={`LazyImage-placeholder stack-item${fadeIn ? ' LazyImage-fade' : ''}`}
            style={fadeStyle(false)}
          />
        )}
      </div>
    </div>
  );
}
