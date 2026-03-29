const RESOURCE_LINKS = [
  {
    label: 'Documentation',
    href: 'https://github.com/garrettsiegel/react-lzy-img#readme',
  },
  {
    label: 'Changelog',
    href: 'https://github.com/garrettsiegel/react-lzy-img/blob/main/CHANGELOG.md',
  },
  {
    label: 'Issues',
    href: 'https://github.com/garrettsiegel/react-lzy-img/issues',
  },
  {
    label: 'Contributing',
    href: 'https://github.com/garrettsiegel/react-lzy-img/blob/main/CONTRIBUTING.md',
  },
];

const STATS = [
  'Bundle size: ~1.4KB gzipped',
  'Test coverage: 97%',
  'TypeScript: Full support',
  'License: MIT',
];

export function Footer() {
  // ============================================================
  // RENDER
  // ============================================================
  return (
    <footer className="border-t border-gray-200 bg-white py-14 text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* ABOUT */}
          <div>
            <h3 className="mb-4 text-xl font-black tracking-tighter text-gray-900 dark:text-white">react-lzy-img</h3>
            <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
              Lightweight React lazy loading library for modern web applications.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/garrettsiegel/react-lzy-img"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex min-h-[44px] items-center rounded-md px-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/react-lzy-img"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex min-h-[44px] items-center rounded-md px-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                npm
              </a>
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="mb-4 text-xl font-black tracking-tighter text-gray-900 dark:text-white">Resources</h3>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((resource) => (
                <li key={resource.label}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex min-h-[44px] items-center rounded-md px-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* STATS */}
          <div>
            <h3 className="mb-4 text-xl font-black tracking-tighter text-gray-900 dark:text-white">Package Stats</h3>
            <ul className="space-y-3">
              {STATS.map((stat) => (
                <li key={stat} className="min-h-[24px] text-sm text-gray-500 dark:text-gray-400">
                  {stat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-12 border-t border-gray-200 pt-8 text-center dark:border-gray-800">
          <p className="text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
            © 2026 Garrett Siegel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
