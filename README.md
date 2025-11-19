# react-lzy-img

A modern, performant React lazy image and picture component library with TypeScript support, fade-in animations, and advanced placeholder options.

## Features

- **Intersection Observer API** with automatic native lazy loading fallback
- **Responsive images** with `<picture>` element and `srcSet` support
- **Multiple placeholder types**: Blurhash, LQIP, and regular images
- **Customizable fade-in transitions** with configurable duration
- **Priority loading** for critical images with eager loading
- **Full accessibility support** with ARIA props
- **Error handling** with custom fallback components
- **TypeScript-first** with complete type coverage
- **Lightweight**: ~3.3 KB gzipped (ESM) | ~2.9 KB gzipped (CJS)

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
| `src` | `string` | **required** | Image source URL |
| `alt` | `string` | **required** | Alt text for accessibility |
| `placeholder` | `string` | - | Placeholder image URL |
| `blurhash` | `string` | - | Blurhash string for blurred placeholder |
| `lqip` | `string` | - | Base64 low-quality image placeholder |
| `fadeIn` | `boolean` | `true` | Enable fade-in transition |
| `fadeInDuration` | `number` | `300` | Fade duration in milliseconds |
| `priority` | `boolean` | `false` | Load immediately (skip lazy loading) |
| `preloadMargin` | `string` | `'200px'` | Viewport margin to trigger loading |
| `forceVisible` | `boolean` | `false` | Skip lazy loading, load immediately |
| `width` / `height` | `number` | - | Container dimensions |
| `aspectRatio` | `number` | - | Aspect ratio (e.g., `16/9`) |
| `onLoad` / `onError` | `function` | - | Event callbacks |
| `fallback` | `ReactNode \| string` | - | Custom error fallback |
| `role` / `ariaLabel` / `ariaDescribedby` | `string` | - | Accessibility props |

### LazyPicture Props

Extends `LazyImage` with:

| Prop | Type | Description |
|------|------|-------------|
| `srcSet` | `string` | Responsive image sources |
| `sizes` | `string` | Responsive image sizes |
| `placeholderBlur` | `boolean` | Show blurred regular placeholder |

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

CSS is automatically injected. Override with these class names:

- `.LazyImage-img` - Main image
- `.LazyImage-placeholder` - Placeholder image
- `.LazyImage-fade` - Fade animation
- `.LazyImage-fallback` - Error fallback

## License

MIT © [Garrett Siegel](https://github.com/garrettsiegel/react-lzy-img)