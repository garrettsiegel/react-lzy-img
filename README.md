# react-lzy-img

A modern, performant React lazy image and picture component library with TypeScript support, fade-in animations, and advanced placeholder options.

## Features

- Intersection Observer powered lazy loading with native `loading="lazy"` fallback
- Responsive `<picture>` support plus blurhash, LQIP, or image placeholders
- Forwards every standard `<img>` attribute (`decoding`, `ref`, custom `aria-*`, etc.)
- Runtime CSS injection (including fallback styles) keeps bundles lean
- Priority/force-visible switches stay reactive after initial mount
- Hooks (`useLazyLoad`, `useLazyImage`) exposed for custom layouts
- Full TypeScript coverage emitted directly from source so declarations never drift

## Bundle Size

**Extremely lightweight** with zero compromises on functionality:

| Format | Size | Gzipped | Description |
|--------|------|---------|-------------|
| **ES Module** | 14.0 KB | **3.8 KB** | Modern bundlers (Webpack, Vite, etc.) |
| **CommonJS** | 14.5 KB | **3.9 KB** | Node.js and legacy tools |
| **TypeScript** | 4.0 KB | - | Complete type definitions |

- **Only 1 dependency**: `blurhash` (2.0.5) - 1.6 KB gzipped
- **Tree-shakeable**: Import only what you need
- **No runtime overhead**: CSS injected once, components optimized for performance
- **Readable builds**: Unminified for better debugging experience

### 🚀 Performance Comparison

| Library | Bundle Size (gzipped) | Dependencies | Features |
|---------|----------------------|--------------|----------|
| **react-lzy-img** | **3.8 KB** | 1 | Full-featured with blurhash + hooks |
| react-intersection-observer | 2.8 KB | 0 | Basic intersection only |
| react-lazyload | 4.2 KB | 0 | Basic lazy loading |
| react-image | 11.8 KB | 2 | Similar features, larger bundle |

*Total cost including `blurhash`: **5.4 KB gzipped** - smaller than most alternatives while offering more features.*

## Installation

```bash
npm install react-lzy-img
```

## Quick Start

```tsx
import { LazyImage, LazyPicture } from 'react-lzy-img';

// Basic lazy image
<LazyImage
  src="/image.jpg"
  alt="Description"
  placeholder="/thumb.jpg"
  width={600}
  height={400}
/>

// Responsive image with blurhash
<LazyPicture
  src="/large.jpg"
  srcSet="/small.jpg 400w, /large.jpg 800w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="Responsive image"
  blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
  aspectRatio={16/9}
/>
```

## API Reference

### LazyImage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` / `alt` | `string` | **required** | Image source and accessible text |
| `placeholder` | `string` | - | Standard placeholder image URL |
| `blurhash` | `string` | - | Blurhash string decoded into a canvas |
| `lqip` | `string` | - | Base64 low-quality image placeholder |
| `fadeIn` | `boolean` | `true` | Toggle fade transition |
| `fadeInDuration` | `number` | `300` | Fade duration in ms |
| `priority` | `boolean` | `false` | Eagerly load (uses `loading="eager"`) |
| `forceVisible` | `boolean` | `false` | Imperatively skip lazy loading (reactive) |
| `preloadMargin` | `string` | `'200px'` | IntersectionObserver root margin |
| `width` / `height` / `aspectRatio` | `number` | - | Layout helpers |
| `fallback` | `ReactNode` | - | Rendered if the image errors |
| `ariaLabel` / `ariaDescribedby` | `string` | - | Convenience accessibility aliases |
| `...imgProps` | `<img>` attrs | - | Any other `<img>` attribute is forwarded |

### LazyPicture Props

Extends every `LazyImage` prop (including `forceVisible`) and adds:

| Prop | Type | Description |
|------|------|-------------|
| `srcSet` | `string` | Responsive image sources passed to `<source>` and `<img>` |
| `sizes` | `string` | Responsive image sizes |
| `placeholderBlur` | `boolean` | Blur regular placeholders when no blurhash/LQIP |

## Placeholder Types

**Priority order:** `blurhash` → `lqip` → `placeholder`

### Blurhash

Blurhash is a compact representation of a placeholder for an image. It creates a beautiful, blurred preview while the real image loads.

```tsx
<LazyImage
  src="/image.jpg"
  alt="Demo image"
  blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
  width={400}
  height={300}
/>
```

### LQIP (Low-Quality Image Placeholder)

A base64-encoded, tiny version of your image shown as a pixelated preview.

```tsx
<LazyImage
  src="/image.jpg"
  alt="Demo image"
  lqip="data:image/jpeg;base64,/9j/4AAQSk..."
  width={400}
  height={300}
/>
```

### Regular Placeholder

A regular image URL that can optionally be blurred.

```tsx
<LazyPicture
  src="/image.jpg"
  placeholder="/thumb.jpg"
  placeholderBlur
  alt="Demo image"
/>
```

## Accessibility Support

Both components support ARIA props for improved screen reader compatibility:

```tsx
<LazyImage
  src="/logo.png"
  alt="Company logo"
  role="img"
  ariaLabel="Acme Corp logo"
  width={120}
  height={40}
/>

// Decorative image (ignored by screen readers)
<LazyImage
  src="/divider.png"
  alt=""
  role="presentation"
  width={800}
  height={2}
/>
```

## Error Handling

```tsx
<LazyImage
  src="/might-fail.jpg"
  alt="Image that might fail"
  fallback="Image failed to load"
  onError={(e) => console.log('Load failed:', e)}
/>
```

## Custom Hooks

```tsx
import { useLazyLoad, useLazyImage } from 'react-lzy-img';

// Custom lazy loading logic
const [elementRef, isInView] = useLazyLoad({ preloadMargin: '100px' });

// Lazy image source management
const [imageRef, imageSrc] = useLazyImage({
  src: '/full-image.jpg',
  placeholderSrc: '/thumbnail.jpg'
});
```

## Styling

CSS (including `.LazyImage-fallback`) is injected once at runtime. Override with these class names:

- `.LazyImage-img` - Main image
- `.LazyImage-placeholder` - Placeholder image
- `.LazyImage-fade` - Fade animation
- `.LazyImage-fallback` - Error fallback

## Development

- `npm run dev` – Vite dev server
- `npm run lint` – ESLint flat config
- `npm run build` – Cross-platform build (cleans `dist`, builds, emits `.d.ts` from `tsc`)

### Bundle Analysis

The build output shows real-time bundle sizes:
```bash
npm run build
# ✓ 9 modules transformed.
# dist/index.es.js  14.20 kB │ gzip: 3.88 kB
# dist/index.cjs.js 14.84 kB │ gzip: 3.97 kB
```

Builds are **unminified by design** to preserve meaningful variable names and enable better debugging in production environments.

## License

MIT © [Garrett Siegel](https://garrettsiegel.com)
---

## Feedback & Collaboration

If you have any feedback, please email me at [garrett@garrettsiegel.com](mailto:garrett@garrettsiegel.com).

If you'd like to collaborate or contribute to this project, the GitHub repository link is available on the npm page:

[github.com/garrettsiegel/react-lzy-img](https://github.com/garrettsiegel/react-lzy-img)