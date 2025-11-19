

# react-lzy-img

A lightweight, high-performance React library for lazy loading images with TypeScript support. Includes components for both standard images and responsive pictures, with built-in fade-in animations and blur-up placeholder support.

> **~1.7 KB gzipped (ESM)** | **~1.5 KB gzipped (CJS)** | **Tree-shakeable** | **TypeScript-first**

## Features


**High Performance**
- Uses the native Intersection Observer API for efficient viewport detection
- **Automatic native lazy loading fallback:** If Intersection Observer is unavailable, falls back to browser-native `<img loading="lazy">` for best compatibility
- React 17+ compatible, works with React 18 and 19
- Extremely lightweight with zero production dependencies
- Automatically injects optimized CSS at runtime

**Developer Experience**
- Fully typed with TypeScript
- Simple, intuitive component API
- Automatic fade-in transitions
- Blur-up placeholder effect support
- Support for responsive images via `srcSet` and `sizes`

**Components & Hooks**
- `LazyImage` component for simple images
- `LazyPicture` component for responsive images
- Custom hooks (`useLazyLoad`, `useLazyImage`) for advanced use cases
- Customizable fade-in duration and easing
- Intersection Observer options (rootMargin, threshold)
- onLoad callback support
- Works inside scrollable containers

## Installation

```sh
npm i react-lzy-img
```

## Quick Start

### LazyImage Component

```tsx
import { LazyImage } from 'react-lzy-img';

export default function MyComponent() {
  return (
    <LazyImage
      src="https://example.com/image.jpg"
      alt="A lazy loaded image"
      placeholder="https://example.com/image-thumb.jpg"
      fadeIn
      fadeInDuration={400}
      width={600}
      height={400}
      onLoad={() => console.log('Image loaded!')}
    />
  );
}
```

### LazyPicture Component (Responsive)

```tsx
import { LazyPicture } from 'react-lzy-img';

export default function ResponsiveImage() {
  return (
    <LazyPicture
      src="https://example.com/image-large.jpg"
      alt="A responsive image"
      srcSet="https://example.com/image-small.jpg 400w, https://example.com/image-large.jpg 800w"
      sizes="(max-width: 600px) 100vw, 800px"
      placeholder="https://example.com/image-thumb.jpg"
      placeholderBlur
      aspectRatio={2}
      width={800}
      fadeInDuration={1200}
      onLoad={() => console.log('Picture loaded!')}
    />
  );
}
```

## API Reference


### LazyImage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | The image source URL |
| `alt` | `string` | **required** | Alt text for accessibility |
| `placeholder` | `string` | undefined | Blur-up placeholder image URL |
| `blurhash` | `string` | undefined | Blurhash string for ultra-light blurred placeholder |
| `lqip` | `string` | undefined | Base64-encoded low-quality image placeholder |
| `fadeIn` | `boolean` | `true` | Enable fade-in transition |
| `fadeInDuration` | `number` | `300` | Fade-in duration in milliseconds |
| `width` | `number` | undefined | Container width (in pixels) |
| `height` | `number` | undefined | Container height (in pixels) |
| `aspectRatio` | `number` | undefined | Aspect ratio (e.g., `16/9`) |
| `className` | `string` | undefined | Additional CSS classes |
| `style` | `CSSProperties` | undefined | Inline styles |
| `rootMargin` | `string` | `'200px'` | Intersection Observer rootMargin |
| `forceVisible` | `boolean` | `false` | Skip lazy loading, load immediately |
| `onLoad` | `() => void` | undefined | Callback when image loads |
| `onError` | `(event) => void` | undefined | Callback when image fails to load |
| `fallback` | `React.ReactNode \| string` | undefined | Custom fallback UI or message if image fails to load |
| `role` | `string` | undefined | ARIA role for the `<img>` element (e.g., `presentation`, `img`) |
| `ariaLabel` | `string` | undefined | ARIA label for the image (sets `aria-label` on `<img>`) |
| `ariaDescribedby` | `string` | undefined | ARIA describedby for the image (sets `aria-describedby` on `<img>`) |


### LazyPicture Props

Extends `LazyImage` props with:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `srcSet` | `string` | undefined | Responsive image sources |
| `sizes` | `string` | undefined | Responsive image sizes |
| `priority` | `boolean` | `false` | Load immediately (eager loading) |
| `placeholderBlur` | `boolean` | `false` | Show blurred placeholder |
| `blurhash` | `string` | undefined | Blurhash string for ultra-light blurred placeholder |
| `lqip` | `string` | undefined | Base64-encoded low-quality image placeholder |
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

### Custom Hooks

**useLazyLoad** - Manage lazy loading with custom content:

```tsx
import { useLazyLoad } from 'react-lzy-img';

const [ref, isInView] = useLazyLoad({ rootMargin: '100px' });
```

**useLazyImage** - Manage lazy-loaded image sources:

```tsx
import { useLazyImage } from 'react-lzy-img';

const [ref, src] = useLazyImage({
  src: 'https://example.com/full.jpg',
  placeholderSrc: 'https://example.com/thumb.jpg',
});
```


## Styling

CSS styles are automatically injected at runtime. Override using these class names:

- `.LazyImage-img` - The main image
- `.LazyImage-placeholder` - The placeholder image
- `.LazyImage-fade` - Fade-in animation
- `.LazyImage-fallback` - Error/fallback message container
- `.grid-stack` and `.stack-item` - Grid stacking
### Error Handling & Fallback Example

If the image fails to load, you can show a custom fallback message or React node:

```tsx
<LazyImage
  src="/broken.jpg"
  alt="Broken image"
  fallback="Could not load image."
  width={300}
  height={200}
/>

// Or with a custom React node:
<LazyImage
  src="/broken.jpg"
  alt="Broken image"
  fallback={<div style={{ color: 'orange' }}>⚠️ Custom error: image missing!</div>}
  width={300}
  height={200}
/>
```


## Browser Support

Modern browsers with `IntersectionObserver` support. If Intersection Observer is unavailable, the library automatically falls back to native browser lazy loading using `<img loading="lazy">`.


## Performance

- Bundle size: ~1.7 KB gzipped (ESM), ~1.5 KB gzipped (CJS)
- Tree-shakeable ESM exports
- Uses native IntersectionObserver API with automatic native lazy fallback

## Examples

### Image Gallery

```tsx
const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];

export default function Gallery() {
  return (
    <div className="grid">
      {images.map((src) => (
        <LazyImage
          key={src}
          src={src}
          alt="Gallery item"
          width={300}
          height={300}
        />
      ))}
    </div>
  );
}
```

## License

MIT © [Garrett Siegel](https://github.com/garrettsiegel/react-lzy-img)
