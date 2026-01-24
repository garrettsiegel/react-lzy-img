import { useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/solid';
import { LazyImage } from 'react-lzy-img';

export function Examples() {
  // ============================================================
  // STATE
  // ============================================================
  const [activeTab, setActiveTab] = useState('basic');
  const [copied, setCopied] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ============================================================
  // DATA
  // ============================================================
  const examples = {
    basic: {
      title: 'Basic Usage',
      code: `import { LazyImage } from 'react-lzy-img';

<LazyImage
  src="https://picsum.photos/800/600"
  alt="Beautiful landscape"
  width={800}
  height={600}
/>`,
      demo: (
        <LazyImage
          src="https://picsum.photos/800/600"
          alt="Beautiful landscape"
          width="100%"
          aspectRatio={16/9}
          className="rounded-lg"
        />
      ),
    },
    placeholder: {
      title: 'With Placeholder',
      code: `<LazyImage
  src="https://picsum.photos/800/600"
  placeholder="https://picsum.photos/80/60"
  alt="Image with placeholder"
  aspectRatio={16/9}
/>`,
      demo: (
        <LazyImage
          src="https://picsum.photos/800/600?random=2"
          placeholder="https://picsum.photos/80/60?random=2"
          alt="Image with placeholder"
          width="100%"
          aspectRatio={16/9}
          className="rounded-lg"
        />
      ),
    },
    responsive: {
      title: 'Responsive Images',
      code: `<LazyImage
  src="https://picsum.photos/1200/800"
  srcSet="https://picsum.photos/600/400 600w,
          https://picsum.photos/1200/800 1200w,
          https://picsum.photos/1800/1200 1800w"
  sizes="(max-width: 640px) 600px,
         (max-width: 1024px) 1200px,
         1800px"
  alt="Responsive image"
  aspectRatio={3/2}
/>`,
      demo: (
        <LazyImage
          src="https://picsum.photos/1200/800?random=3"
          srcSet="https://picsum.photos/600/400?random=3 600w, https://picsum.photos/1200/800?random=3 1200w, https://picsum.photos/1800/1200?random=3 1800w"
          sizes="(max-width: 640px) 600px, (max-width: 1024px) 1200px, 1800px"
          alt="Responsive image with automatic picture element"
          width="100%"
          aspectRatio={3/2}
          className="rounded-lg"
        />
      ),
    },
    priority: {
      title: 'Priority Loading',
      code: `<LazyImage
  src="https://picsum.photos/800/600"
  alt="Above the fold image"
  priority={true}
  fetchPriority="high"
  aspectRatio={16/9}
/>`,
      demo: (
        <LazyImage
          src="https://picsum.photos/800/600?random=4"
          alt="Above the fold image"
          priority={true}
          fetchPriority="high"
          width="100%"
          aspectRatio={16/9}
          className="rounded-lg"
        />
      ),
    },
    blurhash: {
      title: 'Blurhash Placeholder',
      code: `<LazyImage
  src="https://picsum.photos/800/600"
  alt="Image with blurhash"
  blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
  blurhashResolution={32}
  aspectRatio={16/9}
/>`,
      demo: (
        <LazyImage
          src="https://picsum.photos/800/600?random=5"
          alt="Image with blurhash placeholder"
          blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
          blurhashResolution={32}
          width="100%"
          aspectRatio={16/9}
          className="rounded-lg"
        />
      ),
    },
    retry: {
      title: 'Error Retry',
      code: `<LazyImage
  src="https://example.com/might-fail.jpg"
  alt="Image with retry"
  retryAttempts={3}
  retryDelay={1000}
  fallback={<div>Failed after 3 retries</div>}
  aspectRatio={16/9}
/>`,
      demo: (
        <LazyImage
          src="https://invalid-url-demo.example/image.jpg"
          alt="Image with retry mechanism"
          retryAttempts={2}
          retryDelay={500}
          fallback={
            <div className="flex items-center justify-center h-full text-gray-600 font-semibold">
              Failed to load after retries
            </div>
          }
          width="100%"
          aspectRatio={16/9}
          className="rounded-lg"
        />
      ),
    },
  };

  // ============================================================
  // HANDLERS
  // ============================================================
  const handleTabChange = (key: string) => {
    if (key === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(key);
      setIsTransitioning(false);
    }, 150);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            See It In Action
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Interactive examples showing real-world use cases
          </p>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {Object.entries(examples).slice(0, 4).map(([key, { title }], index) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`
                px-6 py-3 rounded-xl font-bold text-base transition-all duration-200
                focus-ring
                ${activeTab === key
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-blue-300'
                }
              `}
              style={activeTab === key ? {} : { animationDelay: `${index * 0.05}s` }}
            >
              {title}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className={`
          grid grid-cols-1 lg:grid-cols-2 gap-8 transition-opacity duration-150
          ${isTransitioning ? 'opacity-0' : 'opacity-100'}
        `}>
          {/* CODE BLOCK */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 overflow-hidden shadow-2xl border-2 border-gray-700 noise-texture">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400 text-sm font-bold tracking-wider uppercase">Code</span>
              <button
                onClick={() => handleCopy(examples[activeTab as keyof typeof examples].code)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-200 focus-ring"
                aria-label="Copy code to clipboard"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <ClipboardDocumentIcon className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="text-sm text-gray-100 overflow-x-auto">
              <code>{examples[activeTab as keyof typeof examples].code}</code>
            </pre>
          </div>

          {/* DEMO PREVIEW */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
            <div className="mb-6">
              <span className="text-gray-600 text-sm font-bold tracking-wider uppercase">Live Demo</span>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 min-h-[300px]">
              {examples[activeTab as keyof typeof examples].demo}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
