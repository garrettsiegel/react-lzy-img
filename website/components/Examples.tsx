import { type KeyboardEvent, useRef, useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/solid';
import { LazyImage } from 'react-lzy-img';

async function copyToClipboard(content: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch {
    return false;
  }
}

type ExampleKey = 'basic' | 'placeholder' | 'responsive' | 'priority' | 'blurhash' | 'retry';

interface ExampleConfig {
  title: string;
  code: string;
  demo: JSX.Element;
}

const EXAMPLE_KEYS: ExampleKey[] = ['basic', 'placeholder', 'responsive', 'priority', 'blurhash', 'retry'];

const EXAMPLES: Record<ExampleKey, ExampleConfig> = {
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
        aspectRatio={16 / 9}
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
        aspectRatio={16 / 9}
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
        aspectRatio={3 / 2}
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
        aspectRatio={16 / 9}
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
        aspectRatio={16 / 9}
        className="rounded-lg"
      />
    ),
  },
  retry: {
    title: 'Resilient Loading',
    code: `<LazyImage
  src="https://example.com/might-fail.jpg"
  alt="Image with retry"
  retryAttempts={3}
  retryDelay={1000}
  retryBackoff
  loadingLabel="Loading resilient image"
  fallback={<div>Failed after 3 retries</div>}
  aspectRatio={16/9}
/>`,
    demo: (
      <LazyImage
        src="https://invalid-url-demo.example/image.jpg"
        alt="Image with retry mechanism"
        retryAttempts={2}
        retryDelay={500}
        retryBackoff
        loadingLabel="Loading resilient image"
        fallback={
          <div className="flex items-center justify-center h-full text-gray-600 font-semibold">
            Failed to load after retries
          </div>
        }
        width="100%"
        aspectRatio={16 / 9}
        className="rounded-lg"
      />
    ),
  },
};

export function Examples() {
  // ============================================================
  // STATE
  // ============================================================
  const [activeTab, setActiveTab] = useState<ExampleKey>('basic');
  const [copied, setCopied] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // ============================================================
  // HANDLERS
  // ============================================================
  const handleTabChange = (key: ExampleKey) => {
    if (key === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(key);
      setIsTransitioning(false);
    }, 150);
  };

  const handleCopy = async (code: string) => {
    const copiedToClipboard = await copyToClipboard(code);
    if (!copiedToClipboard) {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const focusTab = (index: number) => {
    const tabElement = tabRefs.current[index];
    if (tabElement) {
      tabElement.focus();
    }
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = EXAMPLE_KEYS.length - 1;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = index === lastIndex ? 0 : index + 1;
      handleTabChange(EXAMPLE_KEYS[nextIndex]);
      focusTab(nextIndex);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const nextIndex = index === 0 ? lastIndex : index - 1;
      handleTabChange(EXAMPLE_KEYS[nextIndex]);
      focusTab(nextIndex);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      handleTabChange(EXAMPLE_KEYS[0]);
      focusTab(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      handleTabChange(EXAMPLE_KEYS[lastIndex]);
      focusTab(lastIndex);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================
  const activeExample = EXAMPLES[activeTab];

  return (
    <div className="bg-white py-20 dark:bg-gray-950 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-12">
          <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
            See It In Action
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Interactive examples showing real-world use cases
          </p>
        </div>

        {/* TABS */}
        <div role="tablist" aria-label="Example tabs" className="mb-10 flex flex-wrap items-end gap-6 border-b border-gray-200 dark:border-gray-800">
          {EXAMPLE_KEYS.map((key, index) => (
            <button
              key={key}
              id={`tab-${key}`}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              aria-controls={`panel-${key}`}
              aria-selected={activeTab === key}
              tabIndex={activeTab === key ? 0 : -1}
              onClick={() => handleTabChange(key)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`focus-ring -mb-px border-b-2 px-1 pb-3 text-sm font-semibold transition-colors sm:text-base ${
                activeTab === key
                  ? 'border-indigo-500 text-gray-900 dark:text-white'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {EXAMPLES[key].title}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className={`grid grid-cols-1 gap-6 transition-opacity duration-150 lg:grid-cols-2 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {/* CODE BLOCK */}
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950"
          >
            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Code</span>
              <button
                type="button"
                onClick={async () => handleCopy(activeExample.code)}
                className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                aria-label="Copy code to clipboard"
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4 text-emerald-400" />
                ) : (
                  <ClipboardDocumentIcon className="h-4 w-4" />
                )}
              </button>
            </div>

            <pre className="overflow-x-auto px-4 py-5 text-sm leading-relaxed text-gray-100" aria-label="Code example">
              <code>{activeExample.code}</code>
            </pre>
          </div>

          {/* DEMO PREVIEW */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">Live Demo</span>
            </div>
            <div className="min-h-[300px] rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              {activeExample.demo}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
