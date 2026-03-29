import '@testing-library/jest-dom';
import { vi } from 'vitest';

const mockCanvasContext = {
	createImageData: (width: number, height: number) => ({
		data: new Uint8ClampedArray(width * height * 4),
	}),
	putImageData: vi.fn(),
} as unknown as CanvasRenderingContext2D;

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
	value: vi.fn(() => mockCanvasContext),
	writable: true,
	configurable: true,
});
