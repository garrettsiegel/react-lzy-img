/**
 * react-lzy-img - Extremely lightweight React lazy loading library
 * 
 * A comprehensive solution for lazy loading images in React applications with:
 * - 🖼️ Simple LazyImage component for basic lazy loading
 * - 📱 Advanced LazyPicture component with responsive image support  
 * - 🎨 Blurhash placeholder support for beautiful loading states
 * - 🔧 Flexible hooks for custom implementations
 * - 🎭 Smooth fade transitions and accessibility features
 * - 📦 TypeScript support with comprehensive type definitions
 * - ⚡ Performance optimized with minimal bundle size
 * 
 * @packageDocumentation
 */

// Main Components
export { default as LazyImage } from './LazyImage';
export { default as LazyPicture } from './LazyPicture';

// Hooks for custom implementations
export * from './useLazyLoad';

// TypeScript type definitions
export * from './types';

// Configuration constants
export * from './constants';

// Placeholder utilities for advanced usage
export * from './PlaceholderComponents';
export * from './placeholderUtils';
