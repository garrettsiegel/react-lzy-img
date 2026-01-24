import { CodeBracketIcon, DocumentTextIcon, BugAntIcon, UserGroupIcon } from '@heroicons/react/24/solid';

export function Footer() {
  // ============================================================
  // RENDER
  // ============================================================
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-300 py-16 noise-texture">
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>
      
      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* ABOUT */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">react-lzy-img</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Lightweight React lazy loading library for modern web applications.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/garrettsiegel/react-lzy-img"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-all duration-300 hover:scale-110 font-medium min-h-[44px] flex items-center focus-ring rounded-lg px-2"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/react-lzy-img"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-all duration-300 hover:scale-110 font-medium min-h-[44px] flex items-center focus-ring rounded-lg px-2"
              >
                npm
              </a>
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/garrettsiegel/react-lzy-img#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:translate-x-1 min-h-[44px] focus-ring rounded-lg -ml-2 pl-2"
                >
                  <CodeBracketIcon className="w-5 h-5" />
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/garrettsiegel/react-lzy-img/blob/main/CHANGELOG.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:translate-x-1 min-h-[44px] focus-ring rounded-lg -ml-2 pl-2"
                >
                  <DocumentTextIcon className="w-5 h-5" />
                  Changelog
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/garrettsiegel/react-lzy-img/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:translate-x-1 min-h-[44px] focus-ring rounded-lg -ml-2 pl-2"
                >
                  <BugAntIcon className="w-5 h-5" />
                  Issues
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/garrettsiegel/react-lzy-img/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:translate-x-1 min-h-[44px] focus-ring rounded-lg -ml-2 pl-2"
                >
                  <UserGroupIcon className="w-5 h-5" />
                  Contributing
                </a>
              </li>
            </ul>
          </div>

          {/* STATS */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Package Stats</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2 min-h-[32px]">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Bundle Size: ~1.4KB gzipped</span>
              </li>
              <li className="flex items-center gap-2 min-h-[32px]">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Test Coverage: 88%</span>
              </li>
              <li className="flex items-center gap-2 min-h-[32px]">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                <span>TypeScript: Full support</span>
              </li>
              <li className="flex items-center gap-2 min-h-[32px]">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span>License: MIT</span>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center">
          <p className="text-gray-500">© 2026 Garrett Siegel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
