import { useState } from 'react';
import { LazyImage, LazyPicture } from '..';

const heroSrc = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80';
const heroPlaceholder = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=10';
const mountainSrc = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80';
const mountainSrcSet = [
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=640&q=60 640w',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=960&q=60 960w',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80 1600w'
].join(', ');
const mountainSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px';
const blurhashDemo = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
const brokenSrc = 'https://example.com/does-not-exist.jpg';

export default function App() {
  const [forceHeroVisible, setForceHeroVisible] = useState(false);

  return (
    <main>
      <header>
        <h1>react-lzy-img playground</h1>
        <p>Use this page to sanity check the LazyImage and LazyPicture components before publishing.</p>
      </header>

      <section>
        <div className="grid-demo">
          <div>
            <h2>LazyImage with blurhash</h2>
            <p>The blurhash canvas renders instantly, then the full image fades in once it enters the viewport.</p>
            <LazyImage
              src={heroSrc}
              alt="Crowded city street at dusk"
              blurhash={blurhashDemo}
              placeholder={heroPlaceholder}
              width={600}
              height={400}
              aspectRatio={3 / 2}
              preloadMargin="400px"
              forceVisible={forceHeroVisible}
            />
            <button onClick={() => setForceHeroVisible((value) => !value)}>
              {forceHeroVisible ? 'Reset lazy load' : 'Force visible now'}
            </button>
          </div>

          <div>
            <h2>LazyPicture with srcSet</h2>
            <p>Demonstrates responsive sources plus a blurred fallback placeholder.</p>
            <LazyPicture
              src={mountainSrc}
              srcSet={mountainSrcSet}
              sizes={mountainSizes}
              placeholder={heroPlaceholder}
              placeholderBlur
              alt="Mountain range"
              width={600}
              height={400}
              aspectRatio={3 / 2}
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Error and fallback state</h2>
        <p>The fallback slot shows how custom error content is styled via the injected CSS.</p>
        <LazyImage
          src={brokenSrc}
          alt="Broken example"
          fallback={<span>Could not load image.</span>}
          width={320}
          height={200}
        />
      </section>
    </main>
  );
}
