# react-lzy-img

[![npm version](https://img.shields.io/npm/v/react-lzy-img.svg)](https://www.npmjs.com/package/react-lzy-img)
[![npm downloads](https://img.shields.io/npm/dm/react-lzy-img.svg)](https://www.npmjs.com/package/react-lzy-img)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-lzy-img)](https://bundlephobia.com/package/react-lzy-img)
[![CI](https://github.com/garrettsiegel/react-lzy-img/workflows/CI/badge.svg)](https://github.com/garrettsiegel/react-lzy-img/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Lightweight React lazy loading library with responsive images, blurhash placeholders, and full TypeScript support. **~1.4KB gzipped**.

## 📖 Documentation

**[View full documentation and live examples →](https://www.reactlzyimg.online)**

## Features

- **Lazy Loading** - Intersection Observer with `loading="lazy"` fallback
- **Responsive Images** - Automatic `<picture>` element with srcSet/sizes
- **Smart Placeholders** - Blurhash, LQIP, or standard image placeholders
- **React & Preact** - Works with both React and Preact
- **Single Component** - Unified LazyImage handles all use cases
- **Lightweight** - ~1.4KB gzipped, minimal dependencies
- **TypeScript** - Complete type definitions and IntelliSense
- **Accessible** - Built-in ARIA support and screen reader friendly

## Installation

```bash
npm install react-lzy-img
```

### Using with Preact

react-lzy-img works seamlessly with Preact! Just install and configure preact/compat aliasing:

```bash
npm install react-lzy-img preact
```

**Vite:**
```javascript
// vite.config.js
export default {
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime'
    }
  }
}
```

**Webpack:**
```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime'
    }
  }
}
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

## Generating Blurhash Strings

To use blurhash placeholders, you need to generate blurhash strings from your images. You can do this server-side or during your build process:

### Node.js Example

```bash
npm install sharp blurhash
```

```js
const sharp = require('sharp');
const { encode } = require('blurhash');

async function generateBlurhash(imagePath) {
  const { data, info } = await sharp(imagePath)
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const blurhash = encode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    4,
    4
  );

  return blurhash;
}

// Usage
const hash = await generateBlurhash('./image.jpg');
console.log(hash); // "LEHV6nWB2yk8pyo0adR*.7kCMdnj"
```

### Online Tools

- [Blurhash.io](https://blurha.sh/) - Upload images and get blurhash strings
- [Blurhash Playground](https://github.com/woltapp/blurhash) - Official playground

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| IntersectionObserver | 51+ | 55+ | 12.1+ | 15+ |
| Native lazy loading | 77+ | 75+ | 15.4+ | 79+ |
| Picture element | 38+ | 38+ | 9.1+ | 13+ |
| Aspect ratio CSS | 88+ | 89+ | 15+ | 88+ |

**Fallback behavior**: If IntersectionObserver is not supported, images load immediately. Native lazy loading (`loading="lazy"`) is used as a progressive enhancement.

## Troubleshooting

### Images not loading

**Problem**: Images remain blank or don't load
**Solutions**:
- Verify the `src` path is correct and accessible
- Check browser console for network errors
- Ensure parent container has defined height/width
- Try setting `priority={true}` to bypass lazy loading

### Blurhash not rendering

**Problem**: Canvas element shows but blurhash doesn't render
**Solutions**:
- Verify blurhash string is valid (test at [blurha.sh](https://blurha.sh/))
- Check browser console for decode warnings
- Ensure blurhash string is properly formatted (usually 20-30 characters)
- Try a simpler blurhash with fewer components (4x4 instead of 9x9)

### Layout shift issues

**Problem**: Page jumps when images load
**Solutions**:
- Set explicit `width` and `height` props
- Use `aspectRatio` prop to maintain proportions
- Set container dimensions in parent CSS
- Use `min-height` on containers

### Fade animation not smooth

**Problem**: Fade-in appears janky or doesn't work
**Solutions**:
- Ensure `fadeIn={true}` is set (default)
- Adjust `fadeInDuration` (default 300ms)
- Check for CSS conflicts with opacity/transition
- User has `prefers-reduced-motion` enabled (animation disabled by design)

### Performance issues

**Problem**: Page feels slow with many images
**Solutions**:
- Reduce `preloadMargin` (default "200px")
- Use smaller placeholder images or LQIP
- Consider lower-resolution blurhash (16x16 instead of 32x32 canvas)
- Use `priority={true}` only for above-fold images
- Compress source images

### TypeScript errors

**Problem**: Type errors in your code
**Solutions**:
- Ensure `@types/react` is installed
- Check your `tsconfig.json` has `"jsx": "react-jsx"`
- Import types: `import type { LazyImageProps } from 'react-lzy-img'`
- Clear TypeScript cache: `rm -rf node_modules/.cache`

---

## Contributing

Contributions welcome! Please read the [contributing guidelines](https://github.com/garrettsiegel/react-lzy-img/blob/main/CONTRIBUTING.md) before submitting PRs.

## License

MIT © [Garrett Siegel](https://garrettsiegel.com)

## Contributing

Feedback and contributions welcome! 

- **Email:** [garrett@garrettsiegel.com](mailto:garrett@garrettsiegel.com)
- **GitHub:** [github.com/garrettsiegel/react-lzy-img](https://github.com/garrettsiegel/react-lzy-img)