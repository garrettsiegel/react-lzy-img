// Configuration constants for the lazy loading components
export const DEFAULT_FADE_DURATION = 300;
export const DEFAULT_PRELOAD_MARGIN = '200px';
export const BLURHASH_CANVAS_SIZE = 32;
export const INTERSECTION_OBSERVER_THRESHOLD = 0;

// CSS class names for consistent styling
export const CSS_CLASSES = {
  WRAPPER: 'LazyImage-wrapper',
  PLACEHOLDER: 'LazyImage-placeholder',
  IMAGE: 'LazyImage-img',
  FALLBACK: 'LazyImage-fallback',
  FADE: 'LazyImage-fade',
  GRID_STACK: 'grid-stack',
  STACK_ITEM: 'stack-item',
} as const;