import { useRef, useEffect } from 'react';
import { decode } from 'blurhash';
import { BLURHASH_CANVAS_SIZE } from './constants';

/**
 * Props for the BlurhashCanvas component
 */
interface BlurhashCanvasProps {
  /** Blurhash string to decode and render */
  blurhash: string;
  /** Whether the main image has loaded (stops canvas updates when true) */
  isLoaded: boolean;
  /** CSS class name to apply to the canvas element */
  className: string;
  /** CSS styles including fade transition properties */
  fadeStyle: React.CSSProperties;
}

/**
 * Renders a blurhash as a canvas element for use as a blurred placeholder.
 * 
 * Blurhash is a compact representation of a placeholder for an image that can be
 * decoded into a small (32x32) blurred version on the client side. This component
 * decodes the blurhash string and renders it to a canvas element that scales to
 * fill the container.
 * 
 * @param props - Configuration for the blurhash canvas
 * @returns Canvas element with decoded blurhash as placeholder
 * 
 * @example
 * ```tsx
 * <BlurhashCanvas
 *   blurhash="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
 *   isLoaded={false}
 *   className="placeholder-class"
 *   fadeStyle={{ opacity: 0.8, transition: "opacity 300ms" }}
 * />
 * ```
 */
export function BlurhashCanvas({ blurhash, isLoaded, className, fadeStyle }: BlurhashCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!blurhash || !canvasRef.current || isLoaded) return;
    
    try {
      // Decode blurhash to pixel data (RGBA format)
      const pixels = decode(blurhash, BLURHASH_CANVAS_SIZE, BLURHASH_CANVAS_SIZE);
      const context = canvasRef.current.getContext('2d');
      
      if (context) {
        const imageData = context.createImageData(BLURHASH_CANVAS_SIZE, BLURHASH_CANVAS_SIZE);
        imageData.data.set(pixels);
        context.putImageData(imageData, 0, 0);
      }
    } catch {
      // Silently ignore blurhash decode failures - fallback to other placeholders
      // This prevents broken placeholder rendering from breaking the component
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

/**
 * Props for the PlaceholderImage component
 */
interface PlaceholderImageProps {
  /** Source URL of the placeholder image */
  src: string;
  /** CSS class name to apply to the img element */
  className: string;
  /** CSS styles including fade transition properties */
  fadeStyle: React.CSSProperties;
}

/**
 * Renders a placeholder image (LQIP - Low Quality Image Placeholder or regular placeholder).
 * 
 * This component displays an image that serves as a placeholder while the main image loads.
 * Common use cases include:
 * - LQIP: A very small, low-quality version of the main image
 * - Generic placeholder: A branded placeholder image
 * - Colored placeholder: A solid color or gradient image
 * 
 * @param props - Configuration for the placeholder image
 * @returns Img element configured as an accessible placeholder
 * 
 * @example
 * ```tsx
 * <PlaceholderImage
 *   src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
 *   className="placeholder-class"
 *   fadeStyle={{ opacity: 0.8, transition: "opacity 300ms" }}
 * />
 * ```
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