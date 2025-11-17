
# react-lzy-img

A lightweight, high-performance React library for lazy loading images with TypeScript support. Includes components for both standard images and responsive pictures, with built-in fade-in animations and blur-up placeholder support.

> **~1.7 KB gzipped** | **0 dependencies** | **Tree-shakeable** | **TypeScript-first**

## Features

**High Performance**
- Uses the native Intersection Observer API for efficient viewport detection
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

### LazyPicture Props

Extends `LazyImage` props with:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `srcSet` | `string` | undefined | Responsive image sources |
| `sizes` | `string` | undefined | Responsive image sizes |
| `priority` | `boolean` | `false` | Load immediately (eager loading) |
| `placeholderBlur` | `boolean` | `false` | Show blurred placeholder |

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
- `.grid-stack` and `.stack-item` - Grid stacking

## Browser Support

Modern browsers with `IntersectionObserver` support. Falls back to immediate loading if unavailable.

## Performance

- Bundle size: ~1.7 KB gzipped
- Zero dependencies (only requires React)
- Tree-shakeable ESM exports
- Uses native IntersectionObserver API

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
