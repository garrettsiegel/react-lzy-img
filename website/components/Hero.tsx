import { ArrowRightIcon, CodeBracketIcon } from '@heroicons/react/24/solid';

const HERO_SNIPPET = `import { LazyImage } from 'react-lzy-img';

<LazyImage src="/hero.jpg" alt="Hero image" width={1200} height={800} />`;

export function Hero() {
  // ============================================================
  // HANDLERS
  // ============================================================
  const scrollToInstall = () => {
    const element = document.getElementById('installation');
    if (element) {
      const offset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <p className="animate-fade-in-up text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
          React Image Loading Library
        </p>

        <h1 className="animate-fade-in-up mt-4 text-5xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
          react-lzy-img
        </h1>

        <p className="animate-fade-in-up mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
          Lazy loading, responsive sources, and resilient placeholders in one lightweight package. Production-ready in
          {' '}
          <span className="font-black text-gray-900 dark:text-white">~1.4KB gzipped</span>.
        </p>

        <div className="animate-fade-in-up mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            onClick={scrollToInstall}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-indigo-500 bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-indigo-600 hover:bg-indigo-600"
          >
            Get Started
            <ArrowRightIcon className="h-4 w-4" />
          </button>

          <a
            href="https://github.com/garrettsiegel/react-lzy-img"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-white"
          >
            View on GitHub
          </a>
        </div>

        <div className="animate-fade-in-up mt-12 overflow-hidden rounded-xl border border-gray-800 bg-gray-950">
          <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-3">
            <CodeBracketIcon className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Quick Start</span>
          </div>

          <pre className="overflow-x-auto px-4 py-5 text-sm leading-relaxed text-gray-100">
            <code>{HERO_SNIPPET}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
