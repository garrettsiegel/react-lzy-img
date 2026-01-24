import { decode } from 'blurhash';

export type BlurhashResolution = 16 | 32 | 64;

/**
 * Renders a blurhash to a canvas element
 * @param canvas - Canvas element to render to
 * @param blurhash - Blurhash string to decode
 * @param resolution - Resolution for rendering (16, 32, or 64)
 * @returns boolean indicating success or failure
 */
export function renderBlurhash(
  canvas: HTMLCanvasElement,
  blurhash: string,
  resolution: BlurhashResolution = 32
): boolean {
  try {
    const pixels = decode(blurhash, resolution, resolution);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const imageData = ctx.createImageData(resolution, resolution);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
      return true;
    }
    return false;
  } catch (error) {
    console.warn('[LazyImage] Failed to decode blurhash:', error);
    return false;
  }
}

/**
 * Cleans up canvas by setting dimensions to 0 to release memory
 * @param canvas - Canvas element to cleanup
 */
export function cleanupCanvas(canvas: HTMLCanvasElement | null): void {
  if (canvas) {
    canvas.width = 0;
    canvas.height = 0;
  }
}
