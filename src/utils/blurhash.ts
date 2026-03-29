import { decode } from 'blurhash';

export type BlurhashResolution = 16 | 32 | 64;

// Render a blurhash to a canvas element.
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('[LazyImage] Failed to decode blurhash:', errorMessage);
    return false;
  }
}

// Release canvas memory by resetting dimensions.
export function cleanupCanvas(canvas: HTMLCanvasElement | null): void {
  if (canvas) {
    canvas.width = 0;
    canvas.height = 0;
  }
}
