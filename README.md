
# react-lzy-img

A modern, TypeScript-based React component for efficient lazy loading of images and content, inspired by [react-lazy-load](https://www.npmjs.com/package/react-lazy-load) but with a cleaner API and improved developer experience.

## Features

- Uses the Intersection Observer API for performant, reliable lazy loading
- Written in TypeScript with full type definitions
- Supports React 17+
- Flexible `offset`, `threshold`, `height`, `width`, and `onContentVisible` props
- Works inside scrollable containers
- Simple CSS class hooks for transitions (`.LazyLoad`, `.is-visible`)

## Installation

# react-lzy-img

A lightweight, high-performance React library for lazy loading images with TypeScript support. Includes components for both standard images and responsive pictures, with built-in fade-in animations and blur-up placeholder support.

> **~4.8 KB gzipped** | **0 dependencies** | **Tree-shakeable** | **TypeScript-first**

## Features

✨ **High Performance**
- Uses the native Intersection Observer API for efficient viewport detection
- React 17+ compatible, works with React 18 and 19
- Extremely lightweight with zero production dependencies
- Automatically injects optimized CSS at runtime

🎨 **Developer Experience**
- Fully typed with TypeScript
- Simple, intuitive component API
- Automatic fade-in transitions
- Blur-up placeholder effect support
- Support for responsive images via `srcSet` and `sizes`

🚀 **Features**
- `LazyImage` component for simple images
- `LazyPicture` component for responsive images
- Custom hooks (`useLazyLoad`, `useLazyImage`) for advanced use cases
- Customizable fade-in duration and easing
- Intersection Observer options (rootMargin, threshold)
- onLoad callback support
- Works inside scrollable containers

## Installation

```sh
npm install react-lzy-img
```

That's it! No additional setup required. React is already installed as a peer dependency.

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

#### `useLazyLoad`

Manage lazy loading with your own content:

```tsx
import { useLazyLoad } from 'react-lzy-img';

export default function CustomLazy() {
  const [ref, isInView] = useLazyLoad({ rootMargin: '100px' });
  
  return (
    <div ref={ref}>
      {isInView && <ExpensiveComponent />}
    </div>
  );
}
```

#### `useLazyImage`

Manage lazy-loaded image sources:

```tsx
import { useLazyImage } from 'react-lzy-img';

export default function CustomImageLazy() {
  const [ref, src] = useLazyImage({
    src: 'https://example.com/full.jpg',
    placeholderSrc: 'https://example.com/thumb.jpg',
  });
  
  return <img ref={ref} src={src} alt="Lazy" />;
}
```

## Styling

CSS styles are **automatically injected at runtime**—no imports needed.

You can override or extend styles using these class names:

```css
/* The main image */
.LazyImage-img {
  /* Custom styles */
}

/* The placeholder image (when present) */
.LazyImage-placeholder {
  /* Custom styles */
}

/* Fade-in animation class */
.LazyImage-fade {
  /* Custom styles */
}

/* Grid container for stacking */
.grid-stack {
  /* Custom styles */
}

.stack-item {
  /* Custom styles */
}
```

Example: Custom fade-in duration

```css
.LazyImage-fade {
  transition: opacity 600ms ease-in-out !important;
}
```

## Browser Support

- Chrome, Edge, Firefox, Safari (modern versions)
- Requires `IntersectionObserver` API support
- Gracefully falls back to loading immediately if `IntersectionObserver` is unavailable

## Performance

- **Bundle size:** ~4.8 KB gzipped
- **Zero dependencies** - only requires React
- **Tree-shakeable** ESM export for bundler optimization
- **Native API** - uses IntersectionObserver instead of custom scroll detection

## Examples

### Gallery with Placeholders

```tsx
const images = [
  { src: '/img1.jpg', thumb: '/img1-thumb.jpg' },
  { src: '/img2.jpg', thumb: '/img2-thumb.jpg' },
];

export default function Gallery() {
  return (
    <div className="grid">
      {images.map((img) => (
        <LazyImage
          key={img.src}
          src={img.src}
          placeholder={img.thumb}
          alt="Gallery item"
          width={300}
          height={300}
          fadeIn
        />
      ))}
    </div>
  );
}
```

### Priority Images (Above the Fold)

```tsx
export default function Hero() {
  return (
    <LazyImage
      src="/hero.jpg"
      alt="Hero"
      priority // Loads immediately
      width="100%"
      height={400}
    />
  );
}
```

## License

MIT © Garrett Siegel

## Contributing

Contributions welcome! Please open an issue or submit a PR on [GitHub](https://github.com/garrettsiegel/react-lzy-img).

## Usage

```tsx
import { LazyImage, LazyPicture } from 'react-lzy-img';

export default function MyComponent() {
  return (
    <>
      <LazyImage
        src="https://example.com/image.jpg"
        alt="A lazy loaded image"
        placeholder="https://example.com/image-thumb.jpg"
        fadeIn
        fadeInDuration={400}
        width={600}
        height={400}
        onLoad={() => console.log('Main image loaded!')}
      />

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
        onLoad={() => console.log('Main picture loaded!')}
      />
    </>
  );
}
```

## Props

| Prop               | Type                | Default | Description |
|--------------------|---------------------|---------|-------------|
| `offset`           | `number \| string`  | `0`     | How far outside the viewport to start loading (e.g. `300` or `'0px 10px 200px 0px'`). |
| `threshold`        | `number`            | `0`     | How much of the element must be visible before loading (0-1). |
| `height`           | `number \| string`  |         | Height of the container. |
| `width`            | `number \| string`  |         | Width of the container. |
| `onContentVisible` | `() => void`        |         | Callback when content becomes visible. |
| `className`        | `string`            |         | Additional CSS classes. |
| `style`            | `React.CSSProperties` |      | Inline styles. |


## Styling

This package automatically injects its CSS styles at runtime—no need to import a CSS file manually.

You can override or extend the styles using the following class names:

- `.LazyImage-img` – The main image
- `.LazyImage-placeholder` – The placeholder image (blurred)
- `.LazyImage-fade` – Fade-in transition
- `.grid-stack` and `.stack-item` – For stacking placeholder and image

See `src/LazyImage.css` for details.

## License

MIT
      reactDom.configs.recommended,
