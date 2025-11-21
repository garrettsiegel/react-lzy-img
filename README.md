# react-lzy-img

Extremely lightweight React lazy loading library with responsive images, blurhash placeholders, comprehensive TypeScript support, and modular architecture.

## Features

- **Lazy Loading**: Intersection Observer with `loading="lazy"` fallback
- **Responsive Images**: Full `<picture>` element support with srcset/sizes
- **Advanced Placeholders**: Blurhash, LQIP, or standard image placeholders
- **Modular Architecture**: Clean separation of concerns with focused custom hooks
- **Complete Props**: Forwards all standard `<img>` attributes and ARIA props
- **Lightweight**: Only 3.8KB gzipped with single dependency
- **TypeScript**: Complete type definitions with comprehensive JSDoc documentation
- **Performance**: Runtime CSS injection, reactive priority switching, unminified debugging
- **Accessibility**: Built-in ARIA support and screen reader compatibility
- **Developer Experience**: Clean code structure with comprehensive documentation

## Bundle Size

| Format | Size | Gzipped |
|--------|------|---------|
| ES Module | 16.5 KB | **4.3 KB** |
| CommonJS | 17.1 KB | **4.4 KB** |
| TypeScript | 5.2 KB | - |

**Total with blurhash dependency: 5.4 KB gzipped**

- Tree-shakeable ESM exports
- Single production dependency
- Unminified builds with meaningful variable names for debugging
- Zero runtime CSS overhead
- Modular utilities for advanced customization

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

## Advanced Usage & Architecture

### Modular Utilities
The library now features a clean, modular architecture with reusable utilities:

```tsx
import { renderPlaceholder, renderFallback } from 'react-lzy-img';

// Custom component using shared utilities
function CustomLazyComponent({ src, blurhash, fallback }) {
  const [ref, isInView] = useLazyLoad();
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div ref={ref}>
      {renderPlaceholder({
        blurhash,
        isLoaded,
        className: 'my-placeholder',
        fadeStyle: (loaded) => ({ opacity: loaded ? 1 : 0 })
      })}
      {renderFallback({ hasError: false, fallback })}
    </div>
  );
}
```

### Custom Hooks
```tsx
import { useLazyLoad, useLazyImage } from 'react-lzy-img';

const [elementRef, isInView] = useLazyLoad({ preloadMargin: '100px' });
const [imageRef, imageSrc] = useLazyImage({ src: '/full.jpg', placeholderSrc: '/thumb.jpg' });
```

### Component Architecture
Both `LazyImage` and `LazyPicture` are built with focused custom hooks:

- `useImageLoadState()` - Manages loading and error states
- `useImageVisibility()` - Determines when to show images
- `useImageStyles()` - Handles fade effects and responsive styling
- `useImageClasses()` - Manages CSS class composition

### CSS Classes
Override these injected styles:

**LazyImage component:**
- `.LazyImage-wrapper` - Container element
- `.LazyImage-img` - Main image
- `.LazyImage-placeholder` - Placeholder image
- `.LazyImage-fallback` - Error state

**LazyPicture component:**
- `.LazyPicture-wrapper` - Container element
- `.LazyPicture-img` - Main picture/img
- `.LazyPicture-placeholder` - Placeholder image
- `.LazyPicture-fallback` - Error state

**Shared utilities:**
- `.grid-stack` - Stacking container
- `.stack-item` - Stacked elements

## Debugging & Development

### Unminified Builds
The library ships with unminified builds containing meaningful variable names for better debugging:

```javascript
// Built code maintains readability
function useImageLoadState(src, loadedSrc, erroredSrc) {
  return {
    isLoaded: loadedSrc === src,
    hasError: erroredSrc === src,
  };
}
```

### TypeScript Integration
Comprehensive JSDoc documentation for IntelliSense and better developer experience:

```tsx
/**
 * Hook for managing image load state
 * @param src - Current image source URL
 * @param loadedSrc - Successfully loaded source URL
 * @param erroredSrc - Failed source URL
 * @returns Object with loading and error state booleans
 */
function useImageLoadState(src: string, loadedSrc: string | null, erroredSrc: string | null)
```

## License

MIT © [Garrett Siegel](https://garrettsiegel.com)
---

## Feedback & Collaboration

If you have any feedback, please email me at [garrett@garrettsiegel.com](mailto:garrett@garrettsiegel.com).

If you'd like to collaborate or contribute to this project, the GitHub repository link is available on the npm page:

[github.com/garrettsiegel/react-lzy-img](https://github.com/garrettsiegel/react-lzy-img)