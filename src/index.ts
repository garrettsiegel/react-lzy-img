/**
 * react-lzy-img - Lightweight React lazy loading library
 * 
 * A simple, performant solution for lazy loading images in React applications:
 * - 🖼️ Single LazyImage component for all use cases
 * - 📱 Responsive images with picture element support
 * - 🎨 Blurhash and LQIP placeholder support
 * - 🔧 Simple useLazyLoad hook for custom implementations
 * - 🎭 Smooth fade transitions and accessibility
 * - 📦 TypeScript support
 * - ⚡ Minimal bundle size and optimized performance
 */

// Main component
export { default as LazyImage } from './LazyImage';
export type { LazyImageProps } from './LazyImage';

// Hook for custom implementations
export { useLazyLoad } from './useLazyLoad';
export type { UseLazyLoadOptions } from './useLazyLoad';
