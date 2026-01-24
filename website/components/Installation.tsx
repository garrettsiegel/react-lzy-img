import { ClipboardDocumentIcon, BookOpenIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export function Installation() {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedQuickStart, setCopiedQuickStart] = useState(false);
  return (
    <div className="bg-white py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight">Get Started in Seconds</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Install react-lzy-img and start optimizing your images immediately
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Install */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl border-2 border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400 text-sm font-bold tracking-wider uppercase">Install</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('npm install react-lzy-img');
                  setCopiedInstall(true);
                  setTimeout(() => setCopiedInstall(false), 2000);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-200"
              >
                {copiedInstall ? (
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
            <pre className="text-lg text-green-400 font-semibold">
              <code>npm install react-lzy-img</code>
            </pre>
          </div>

          {/* Quick Start */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl border-2 border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400 text-sm font-bold tracking-wider uppercase">Quick Start</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`import { LazyImage } from 'react-lzy-img';

<LazyImage
  src="/image.jpg"
  alt="Description"
  width={600}
  height={400}
/>`);
                  setCopiedQuickStart(true);
                  setTimeout(() => setCopiedQuickStart(false), 2000);
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-200 focus-ring min-h-[44px]"
                aria-label="Copy quick start code"
              >
                {copiedQuickStart ? (
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
              <code>{`import { LazyImage } from 'react-lzy-img';

<LazyImage
  src="/image.jpg"
  alt="Description"
  width={600}
  height={400}
/>`}</code>
            </pre>
          </div>

          {/* API Props */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 shadow-2xl border-2 border-blue-200 noise-texture">
            <h3 className="text-3xl font-black text-gray-900 mb-8">Essential Props</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <code className="text-blue-600 font-bold text-lg">src</code>
                <span className="text-gray-500 ml-2 font-medium">string (required)</span>
                <p className="text-gray-600 mt-1.5">The source URL of the image</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <code className="text-blue-600 font-bold text-lg">alt</code>
                <span className="text-gray-500 ml-2 font-medium">string (required)</span>
                <p className="text-gray-600 mt-1.5">Alternative text for accessibility</p>
              </div>
              <div className="border-l-4 border-cyan-500 pl-4 py-2">
                <code className="text-cyan-600 font-bold text-lg">placeholder</code>
                <span className="text-gray-500 ml-2 font-medium">string</span>
                <p className="text-gray-600 mt-1.5">URL for placeholder image</p>
              </div>
              <div className="border-l-4 border-cyan-500 pl-4 py-2">
                <code className="text-cyan-600 font-bold text-lg">blurhash</code>
                <span className="text-gray-500 ml-2 font-medium">string</span>
                <p className="text-gray-600 mt-1.5">Blurhash string for placeholder</p>
              </div>
              <div className="border-l-4 border-cyan-500 pl-4 py-2">
                <code className="text-cyan-600 font-bold text-lg">priority</code>
                <span className="text-gray-500 ml-2 font-medium">boolean</span>
                <p className="text-gray-600 mt-1.5">Load image immediately (above-the-fold)</p>
              </div>
              <div className="border-l-4 border-cyan-500 pl-4 py-2">
                <code className="text-cyan-600 font-bold text-lg">srcSet</code>
                <span className="text-gray-500 ml-2 font-medium">string</span>
                <p className="text-gray-600 mt-1.5">Responsive image sources</p>
              </div>
              <div className="border-l-4 border-cyan-500 pl-4 py-2">
                <code className="text-cyan-600 font-bold text-lg">aspectRatio</code>
                <span className="text-gray-500 ml-2 font-medium">number</span>
                <p className="text-gray-600 mt-1.5">Aspect ratio for layout (e.g., 16/9)</p>
              </div>
              <div className="border-l-4 border-cyan-500 pl-4 py-2">
                <code className="text-cyan-600 font-bold text-lg">fadeIn</code>
                <span className="text-gray-500 ml-2 font-medium">boolean (default: true)</span>
                <p className="text-gray-600 mt-1.5">Enable fade-in animation on load</p>
              </div>
            </div>
          </div>

          {/* Documentation Link */}
          <div className="text-center pt-8">
            <a
              href="https://github.com/garrettsiegel/react-lzy-img#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-200 focus-ring"
            >
              <BookOpenIcon className="w-6 h-6" />
              View Full Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
