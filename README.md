# react-lzy-img

Extremely lightweight React lazy loading library with responsive images, blurhash placeholders, and comprehensive TypeScript support.

## Features

- **Lazy Loading**: Intersection Observer with `loading="lazy"` fallback
- **Responsive Images**: Full `<picture>` element support with srcset/sizes
- **Advanced Placeholders**: Blurhash, LQIP, or standard image placeholders
- **Complete Props**: Forwards all standard `<img>` attributes and ARIA props
- **Lightweight**: Only 3.8KB gzipped with single dependency
- **TypeScript**: Complete type definitions with zero configuration
- **Performance**: Runtime CSS injection, reactive priority switching
- **Accessibility**: Built-in ARIA support and screen reader compatibility

## Bundle Size

| Format | Size | Gzipped |
|--------|------|---------|
| ES Module | 14.0 KB | **3.8 KB** |
| CommonJS | 14.5 KB | **3.9 KB** |
| TypeScript | 4.0 KB | - |

**Total with blurhash dependency: 5.4 KB gzipped**

- Tree-shakeable ESM exports
- Single production dependency
- Unminified builds for debugging
- Zero runtime CSS overhead

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

## API

### LazyImage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Image source URL |
| `alt` | `string` | **required** | Accessible image description |
| `placeholder` | `string` | - | Placeholder image URL |
| `blurhash` | `string` | - | Blurhash string for canvas placeholder |
| `lqip` | `string` | - | Base64 low-quality image placeholder |
| `fadeIn` | `boolean` | `true` | Enable fade transition |
| `fadeInDuration` | `number` | `300` | Fade duration (ms) |
| `priority` | `boolean` | `false` | Load eagerly (`loading="eager"`) |
| `forceVisible` | `boolean` | `false` | Skip lazy loading (reactive) |
| `preloadMargin` | `string` | `'200px'` | Intersection observer margin |
| `fallback` | `ReactNode` | - | Error state content |
| `...props` | `ImgHTMLAttributes` | - | All standard `<img>` attributes |

### LazyPicture

Extends `LazyImage` with additional props:

| Prop | Type | Description |
|------|------|-------------|
| `srcSet` | `string` | Responsive image sources |
| `sizes` | `string` | Responsive size descriptors |
| `placeholderBlur` | `boolean` | Blur non-blurhash placeholders |

## Placeholders

Supports multiple placeholder types (priority: `blurhash` > `lqip` > `placeholder`):

```tsx
// Blurhash - decoded canvas blur
<LazyImage 
  src="/image.jpg" 
  alt="Description"
  blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" 
/>

// LQIP - base64 low-quality preview  
<LazyImage 
  src="/image.jpg" 
  alt="Description"
  lqip="data:image/jpeg;base64,..." 
/>

// Standard placeholder with optional blur
<LazyPicture 
  src="/image.jpg" 
  alt="Description"
  placeholder="/thumb.jpg" 
  placeholderBlur 
/>
```

## Advanced Usage

```tsx
// Accessibility and ARIA support
<LazyImage
  src="/logo.png"
  alt="Company logo"
  role="img"
  ariaLabel="Acme Corp detailed description"
/>

// Error handling with fallback
<LazyImage
  src="/might-fail.jpg"
  alt="Description"
  fallback="Failed to load image"
  onError={(e) => console.log('Error:', e)}
/>

// Priority loading (no lazy loading)
<LazyImage
  src="/hero.jpg"
  alt="Hero image"
  priority
  fadeIn={false}
/>
```

## Hooks & Styling

### Custom Hooks
```tsx
import { useLazyLoad, useLazyImage } from 'react-lzy-img';

const [elementRef, isInView] = useLazyLoad({ preloadMargin: '100px' });
const [imageRef, imageSrc] = useLazyImage({ src: '/full.jpg', placeholderSrc: '/thumb.jpg' });
```

### CSS Classes
Override these injected styles:
- `.LazyImage-img` - Main image
- `.LazyImage-placeholder` - Placeholder  
- `.LazyImage-fade` - Fade transition
- `.LazyImage-fallback` - Error state

## License

MIT © [Garrett Siegel](https://garrettsiegel.com)
---

## Feedback & Collaboration

If you have any feedback, please email me at [garrett@garrettsiegel.com](mailto:garrett@garrettsiegel.com).

If you'd like to collaborate or contribute to this project, the GitHub repository link is available on the npm page:

[github.com/garrettsiegel/react-lzy-img](https://github.com/garrettsiegel/react-lzy-img)