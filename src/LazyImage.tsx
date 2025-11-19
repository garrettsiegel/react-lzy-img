import { useRef, useState, useEffect } from 'react';
import { decode } from 'blurhash';
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
    onError,
    fallback,
    blurhash,
    lqip,
    rootMargin = '200px',
  } = props;


  // Blurhash canvas ref
  const blurhashRef = useRef<HTMLCanvasElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(forceVisible);
  const [hasError, setHasError] = useState(false);

  // Draw blurhash to canvas when needed
  useEffect(() => {
    if (!blurhash || !blurhashRef.current || isLoaded) return;
    try {
      // Reasonable default size for preview
      const width = 32, height = 32;
      const pixels = decode(blurhash, width, height);
      const ctx = blurhashRef.current.getContext('2d');
      if (ctx) {
        const imageData = ctx.createImageData(width, height);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
      }
    } catch {}
  }, [blurhash, isLoaded]);


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
          {hasError ? (
            fallback ? (
              typeof fallback === 'string' ? <div className="LazyImage-fallback">{fallback}</div> : fallback
            ) : (
              <div className="LazyImage-fallback">Image failed to load.</div>
            )
          ) : <>
            {/* Blurhash placeholder */}
            {blurhash && !isLoaded && (
              <canvas
                ref={blurhashRef}
                width={32}
                height={32}
                aria-hidden="true"
                className={`LazyImage-placeholder stack-item${fadeIn ? ' LazyImage-fade' : ''}`}
                style={{ ...fadeStyle(false), width: '100%', height: '100%', display: 'block' }}
              />
            )}
            {/* LQIP placeholder */}
            {!blurhash && lqip && !isLoaded && (
              <img
                src={lqip}
                alt=""
                aria-hidden="true"
                className={`LazyImage-placeholder stack-item${fadeIn ? ' LazyImage-fade' : ''}`}
                style={fadeStyle(false)}
              />
            )}
            {/* Fallback to regular placeholder */}
            {!blurhash && !lqip && placeholder && !isLoaded && (
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
              onError={e => { setHasError(true); onError?.(e); }}
              className={`LazyImage-img stack-item${fadeIn ? ' LazyImage-fade' : ''}`}
              style={fadeStyle(isLoaded)}
            />
          </>}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`LazyImage-wrapper${className ? ' ' + className : ''}`} style={sizeStyle}>
      <div className="grid-stack">
        {hasError ? (
          fallback ? (
            typeof fallback === 'string' ? <div className="LazyImage-fallback">{fallback}</div> : fallback
          ) : (
            <div className="LazyImage-fallback">Image failed to load.</div>
          )
        ) : <>
          {/* Blurhash placeholder */}
          {blurhash && !isLoaded && (
            <canvas
              ref={blurhashRef}
              width={32}
              height={32}
              aria-hidden="true"
              className={`LazyImage-placeholder stack-item${fadeIn ? ' LazyImage-fade' : ''}`}
              style={{ ...fadeStyle(false), width: '100%', height: '100%', display: 'block' }}
            />
          )}
          {/* LQIP placeholder */}
          {!blurhash && lqip && !isLoaded && (
            <img
              src={lqip}
              alt=""
              aria-hidden="true"
              className={`LazyImage-placeholder stack-item${fadeIn ? ' LazyImage-fade' : ''}`}
              style={fadeStyle(false)}
            />
          )}
          {/* Fallback to regular placeholder */}
          {!blurhash && !lqip && placeholder && !isLoaded && (
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
              onError={e => { setHasError(true); onError?.(e); }}
              className={`LazyImage-img stack-item${fadeIn ? ' LazyImage-fade' : ''}`}
              style={fadeStyle(isLoaded)}
            />
          )}
        </>}
      </div>
    </div>
  );
}
