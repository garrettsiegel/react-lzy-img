import { ClipboardDocumentIcon, BookOpenIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

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

interface PropRow {
  name: string;
  type: string;
  description: string;
}

const PROP_GROUPS: Array<{ title: string; rows: PropRow[] }> = [
  {
    title: 'Required',
    rows: [
      { name: 'src', type: 'string', description: 'Source URL for the image asset.' },
      { name: 'alt', type: 'string', description: 'Alternative text used by assistive technologies.' },
    ],
  },
  {
    title: 'Placeholders',
    rows: [
      { name: 'placeholder', type: 'string', description: 'URL for a low-fidelity placeholder image.' },
      { name: 'blurhash', type: 'string', description: 'Blurhash token rendered before the image loads.' },
      { name: 'lqip', type: 'string', description: 'Low-quality image placeholder source.' },
    ],
  },
  {
    title: 'Layout & Loading',
    rows: [
      { name: 'aspectRatio', type: 'number', description: 'Reserve space and avoid layout shift while loading.' },
      { name: 'srcSet', type: 'string', description: 'Responsive image sources for the picture/source pipeline.' },
      { name: 'sizes', type: 'string', description: 'Viewport sizing hints used with srcSet.' },
      { name: 'priority', type: 'boolean', description: 'Loads immediately for above-the-fold content.' },
      { name: 'fetchPriority', type: "'high' | 'low' | 'auto'", description: 'Browser fetch priority hint.' },
      { name: 'fadeIn', type: 'boolean', description: 'Enable or disable the default fade-in transition.' },
    ],
  },
  {
    title: 'Resilience & Accessibility',
    rows: [
      { name: 'fallback', type: 'ReactNode | string', description: 'UI rendered after final load failure.' },
      { name: 'retryAttempts', type: 'number', description: 'How many retry attempts to perform after failure.' },
      { name: 'retryDelay', type: 'number', description: 'Delay in milliseconds between retries.' },
      { name: 'retryBackoff', type: 'boolean', description: 'Enable exponential backoff between retries.' },
      { name: 'loadingLabel', type: 'string', description: 'Accessible loading announcement for screen readers.' },
    ],
  },
];

const QUICK_START_EXAMPLE = `import { LazyImage } from 'react-lzy-img';

<LazyImage
  src="/image.jpg"
  alt="Description"
  width={600}
  height={400}
/>`;

export function Installation() {
  // ============================================================
  // STATE
  // ============================================================
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedQuickStart, setCopiedQuickStart] = useState(false);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="border-t border-gray-200 bg-white py-20 dark:border-gray-800 dark:bg-gray-950 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
            Get Started in Seconds
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Install react-lzy-img and start optimizing your images immediately
          </p>
        </div>

        <div className="mx-auto max-w-5xl space-y-6">
          {/* Install */}
          <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-950">
            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Install</span>
              <button
                type="button"
                onClick={async () => {
                  const copied = await copyToClipboard('npm install react-lzy-img');
                  if (!copied) {
                    return;
                  }
                  setCopiedInstall(true);
                  setTimeout(() => setCopiedInstall(false), 2000);
                }}
                className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                aria-label="Copy install command"
              >
                {copiedInstall ? (
                  <CheckIcon className="h-4 w-4 text-emerald-400" />
                ) : (
                  <ClipboardDocumentIcon className="h-4 w-4" />
                )}
              </button>
            </div>

            <pre className="px-4 py-4 text-sm font-semibold text-gray-100">
              <code>npm install react-lzy-img</code>
            </pre>
          </div>

          {/* Quick Start */}
          <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-950">
            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Quick Start</span>
              <button
                type="button"
                onClick={async () => {
                  const copied = await copyToClipboard(QUICK_START_EXAMPLE);
                  if (!copied) {
                    return;
                  }
                  setCopiedQuickStart(true);
                  setTimeout(() => setCopiedQuickStart(false), 2000);
                }}
                className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                aria-label="Copy quick start code"
              >
                {copiedQuickStart ? (
                  <CheckIcon className="h-4 w-4 text-emerald-400" />
                ) : (
                  <ClipboardDocumentIcon className="h-4 w-4" />
                )}
              </button>
            </div>

            <pre className="overflow-x-auto px-4 py-5 text-sm leading-relaxed text-gray-100">
              <code>{QUICK_START_EXAMPLE}</code>
            </pre>
          </div>

          {/* API Props */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 sm:p-8">
            <h3 className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">Essential Props</h3>
            <div className="mt-6 space-y-8">
              {PROP_GROUPS.map((group) => (
                <div key={group.title}>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
                    {group.title}
                  </h4>

                  <div className="mt-3 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                    {group.rows.map((row) => (
                      <div
                        key={row.name}
                        className="grid grid-cols-1 gap-2 border-t border-gray-200 px-4 py-3 first:border-t-0 sm:grid-cols-[180px_190px_1fr] dark:border-gray-800"
                      >
                        <code className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{row.name}</code>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{row.type}</span>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{row.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documentation Link */}
          <div className="pt-2 text-left">
            <a
              href="https://github.com/garrettsiegel/react-lzy-img#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-white"
            >
              <BookOpenIcon className="h-5 w-5" />
              View Full Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
