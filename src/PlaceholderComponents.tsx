import { useRef, useEffect } from 'react';
import { decode } from 'blurhash';
import { BLURHASH_CANVAS_SIZE } from './constants';

interface BlurhashCanvasProps {
  blurhash: string;
  isLoaded: boolean;
  className: string;
  fadeStyle: React.CSSProperties;
}

/**
 * Renders a blurhash as a canvas element for use as a placeholder
 */
export function BlurhashCanvas({ blurhash, isLoaded, className, fadeStyle }: BlurhashCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!blurhash || !canvasRef.current || isLoaded) return;
    
    try {
      const pixels = decode(blurhash, BLURHASH_CANVAS_SIZE, BLURHASH_CANVAS_SIZE);
      const context = canvasRef.current.getContext('2d');
      
      if (context) {
        const imageData = context.createImageData(BLURHASH_CANVAS_SIZE, BLURHASH_CANVAS_SIZE);
        imageData.data.set(pixels);
        context.putImageData(imageData, 0, 0);
      }
    } catch {
      // Ignore blurhash decode failures and fall back to other placeholders
    }
  }, [blurhash, isLoaded]);

  return (
    <canvas
      ref={canvasRef}
      width={BLURHASH_CANVAS_SIZE}
      height={BLURHASH_CANVAS_SIZE}
      aria-hidden="true"
      className={className}
      style={{ 
        ...fadeStyle, 
        width: '100%', 
        height: '100%', 
        display: 'block' 
      }}
    />
  );
}

interface PlaceholderImageProps {
  src: string;
  className: string;
  fadeStyle: React.CSSProperties;
}

/**
 * Renders a placeholder image (LQIP or regular placeholder)
 */
export function PlaceholderImage({ src, className, fadeStyle }: PlaceholderImageProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      style={fadeStyle}
    />
  );
}