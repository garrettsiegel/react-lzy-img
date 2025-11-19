

# react-lzy-img

A lightweight React library for lazy loading images with TypeScript support, fade-in animations, and advanced placeholder options including Blurhash and LQIP.

> **~3.3 KB gzipped (ESM)** | **~2.9 KB gzipped (CJS)** | **Tree-shakeable** | **TypeScript-first**

## Features

- **Intersection Observer API** with automatic native lazy loading fallback
- **Responsive images** with `<picture>` element and `srcSet` support  
- **Multiple placeholder types**: Blurhash, LQIP, and regular images
- **Customizable fade-in transitions** with configurable duration
- **Priority loading** for critical images with eager loading
- **Full accessibility support** with ARIA props
- **Error handling** with custom fallback components
- **TypeScript-first** with complete type coverage
- **Zero dependencies** except for optional blurhash decoding

## Installation

```sh
npm i react-lzy-img
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
### Blurhash & LQIP Placeholders

**Blurhash** is a tiny string that encodes a blurred, colorful preview of your image. It’s decoded in the browser and shown as a fast, visually appealing placeholder while the real image loads. Extremely lightweight and used by sites like Unsplash.

**LQIP** (Low-Quality Image Placeholder) is a tiny, base64-encoded version of your image. It’s shown as a pixelated preview before the real image loads.

If both `blurhash` and `lqip` are provided, `blurhash` is used. If neither is provided, the regular `placeholder` is used.

**Example:**

```tsx
<LazyImage
  src="/real.jpg"
  alt="Demo image"
  blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
  width={400}
  height={300}
/>

<LazyImage
  src="/real.jpg"
  alt="Demo image"
  lqip="data:image/jpeg;base64,/9j/4AAQSk..."
  width={400}
  height={300}
/>
```
| `onError` | `(event) => void` | undefined | Callback when image fails to load |
| `fallback` | `React.ReactNode \| string` | undefined | Custom fallback UI or message if image fails to load |
| `role` | `string` | undefined | ARIA role for the `<img>` element (e.g., `presentation`, `img`) |
| `ariaLabel` | `string` | undefined | ARIA label for the image (sets `aria-label` on `<img>`) |
| `ariaDescribedby` | `string` | undefined | ARIA describedby for the image (sets `aria-describedby` on `<img>`) |
## Accessibility (ARIA Support)

Both `LazyImage` and `LazyPicture` support ARIA and accessibility props for improved screen reader and assistive technology support:

| Prop | Description |
|------|-------------|
| `role` | Sets the ARIA role on the `<img>` (e.g., `presentation` for decorative images, `img` for meaningful content) |
| `ariaLabel` | Sets the `aria-label` attribute on the `<img>` for custom screen reader text |
| `ariaDescribedby` | Sets the `aria-describedby` attribute on the `<img>` for referencing additional descriptive content |

**Usage Example:**

```tsx
<LazyImage
  src="/logo.png"
  alt="Company logo"
  role="img"
  ariaLabel="Acme Corp logo"
  width={120}
  height={40}
/>

// Decorative image (ignored by screen readers):
<LazyImage
  src="/divider.png"
  alt=""
  role="presentation"
  width={800}
  height={2}
/>
```

**Best Practices:**
- Always provide a meaningful `alt` text for important images.
- Use `role="presentation"` and `alt=""` for purely decorative images.
- Use `ariaLabel` for custom screen reader text if needed.
- Use `ariaDescribedby` to reference additional descriptive content elsewhere on the page.

### Placeholder Types

**Priority order:** `blurhash` → `lqip` → `placeholder`

- **Blurhash**: Ultra-lightweight blurred preview (requires decode)
- **LQIP**: Base64-encoded low-quality image  
- **Placeholder**: Regular image URL with optional blur effect

```tsx
// Blurhash placeholder
<LazyImage src="/image.jpg" blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" />

// LQIP placeholder  
<LazyImage src="/image.jpg" lqip="data:image/jpeg;base64,/9j/..." />

// Regular placeholder with blur
<LazyPicture src="/image.jpg" placeholder="/thumb.jpg" placeholderBlur />
```

### Custom Hooks

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

### Error Handling

```tsx
<LazyImage
  src="/might-fail.jpg"
  alt="Image that might fail"
  fallback="Image failed to load"
  onError={(e) => console.log('Load failed:', e)}
/>
```

## Styling

CSS is automatically injected. Override with:

- `.LazyImage-img` - Main image
- `.LazyImage-placeholder` - Placeholder image  
- `.LazyImage-fade` - Fade animation
- `.LazyImage-fallback` - Error fallback

## License

MIT © [Garrett Siegel](https://github.com/garrettsiegel/react-lzy-img)
