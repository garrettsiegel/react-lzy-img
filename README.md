# react-lzy-img

Lightweight React lazy loading library with responsive images, blurhash placeholders, and TypeScript support. **Under 2KB gzipped**.

## Features

- **Lazy Loading** - Intersection Observer with `loading="lazy"` fallback
- **Responsive Images** - Automatic `<picture>` element with srcSet/sizes
- **Smart Placeholders** - Blurhash, LQIP, or standard image placeholders  
- **React & Preact** - Works with both React and Preact
- **Single Component** - Unified LazyImage handles all use cases
- **Lightweight** - Under 2KB gzipped, minimal dependencies
- **TypeScript** - Complete type definitions and IntelliSense
- **Accessible** - Built-in ARIA support and screen reader friendly

## Installation

```bash
npm install react-lzy-img
```

**Bundle Size:** ~1.4KB gzipped • Tree-shakeable • Single dependency (blurhash)

## Quick Start

```tsx
import { LazyImage } from 'react-lzy-img';

// Basic usage
<LazyImage
  src="/image.jpg"
  alt="Description"
  placeholder="/thumb.jpg"
  width={600}
  height={400}
/>

// Responsive with blurhash
<LazyImage
  src="/large.jpg"
  srcSet="/small.jpg 400w, /large.jpg 800w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="Responsive image"
  blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
  aspectRatio={16/9}
/>
```

### Placeholder Types

```tsx
// Blurhash (canvas blur effect)
<LazyImage src="/image.jpg" alt="Description" blurhash="LEHV6nWB2yk8..." />

// LQIP (base64 preview)  
<LazyImage src="/image.jpg" alt="Description" lqip="data:image/jpeg;base64,..." />

// Standard placeholder
<LazyImage src="/image.jpg" alt="Description" placeholder="/thumb.jpg" />
```

## API Reference

### LazyImage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Image source URL |
| `alt` | `string` | **required** | Image description |
| `srcSet` | `string` | - | Responsive sources (auto enables `<picture>`) |
| `sizes` | `string` | - | Responsive size descriptors |
| `placeholder` | `string` | - | Placeholder image URL |
| `blurhash` | `string` | - | Blurhash string (canvas blur) |
| `lqip` | `string` | - | Base64 LQIP |
| `fadeIn` | `boolean` | `true` | Fade transition |
| `fadeInDuration` | `number` | `300` | Fade duration (ms) |
| `priority` | `boolean` | `false` | Eager loading |
| `preloadMargin` | `string` | `'200px'` | Observer margin |
| `fallback` | `ReactNode \| string` | - | Error state content |
| `className` | `string` | - | CSS class for wrapper |
| `width` | `number \| string` | - | Image width |
| `height` | `number \| string` | - | Image height |
| `aspectRatio` | `number` | - | CSS aspect-ratio |
| `style` | `CSSProperties` | - | Inline styles for wrapper |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Native loading attribute |
| `onLoad` | `function` | - | Image load event handler |
| `onError` | `function` | - | Image error event handler |
| `...props` | `ImgHTMLAttributes` | - | Standard `<img>` attributes |



## Examples

```tsx
// Error handling
<LazyImage
  src="/might-fail.jpg"
  alt="Description"
  fallback="Failed to load"
  onError={(e) => console.log('Error:', e)}
/>

// Priority loading (hero images)
<LazyImage
  src="/hero.jpg"
  alt="Hero image"
  priority
  fadeIn={false}
/>

// Accessibility
<LazyImage
  src="/logo.png"
  alt="Company logo"
  role="img"
/>
```

## Styling

The component uses inline styles for minimal footprint. You can customize styling via the `className` and `style` props:

```tsx
<LazyImage
  src="/image.jpg"
  alt="Styled image"
  className="my-image"
  style={{ borderRadius: '8px', overflow: 'hidden' }}
/>
```

## Framework Support

**React** - Full support with hooks and components
```tsx
import { LazyImage } from 'react-lzy-img';
```

**Preact** - Fully compatible with simple setup
```tsx
import { LazyImage } from 'react-lzy-img';
// Works seamlessly with Preact!
```

> **Preact Setup**: Add to your `vite.config.js`:
> ```js
> export default {
>   resolve: {
>     alias: {
>       "react": "preact/compat",
>       "react-dom": "preact/compat"
>     }
>   }
> }
> ```

## TypeScript

Fully typed with IntelliSense support:

```tsx
import type { LazyImageProps } from 'react-lzy-img';

const props: LazyImageProps = {
  src: '/image.jpg',
  alt: 'Description',
  onLoad: (event) => console.log('Loaded'), // Typed
  onError: (event) => console.error('Failed'), // Typed
};
```

---

## License

MIT © [Garrett Siegel](https://garrettsiegel.com)

## Contributing

Feedback and contributions welcome! 

- **Email:** [garrett@garrettsiegel.com](mailto:garrett@garrettsiegel.com)
- **GitHub:** [github.com/garrettsiegel/react-lzy-img](https://github.com/garrettsiegel/react-lzy-img)