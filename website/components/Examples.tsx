import { useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/solid';
import { LazyImage } from 'react-lzy-img';

export default function Examples() {
  const [activeTab, setActiveTab] = useState('basic');
  const [copied, setCopied] = useState(false);

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
  src="https://picsum.photos/800/600"
  srcSet="https://picsum.photos/400/300 400w,
          https://picsum.photos/800/600 800w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Responsive image"
/>`,
      demo: (
        <LazyImage
          src="https://picsum.photos/800/600?random=3"
          srcSet="https://picsum.photos/400/300?random=3 400w, https://picsum.photos/800/600?random=3 800w"
          sizes="(max-width: 600px) 400px, 800px"
          alt="Responsive image"
          width="100%"
          aspectRatio={16/9}
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
  aspectRatio={16/9}
/>`,
      demo: (
        <LazyImage
          src="https://picsum.photos/800/600?random=4"
          alt="Above the fold image"
          priority={true}
          width="100%"
          aspectRatio={16/9}
          className="rounded-lg"
        />
      ),
    },
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight">See It In Action</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Interactive examples showing react-lzy-img's powerful features
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {Object.entries(examples).map(([key, { title }]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === key
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl shadow-blue-500/50 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              {title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 overflow-hidden shadow-2xl border-2 border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400 text-sm font-bold tracking-wider uppercase">Code</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(examples[activeTab as keyof typeof examples].code);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-200"
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

          {/* Demo */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
            <div className="mb-6">
              <span className="text-gray-600 text-sm font-bold tracking-wider uppercase">Live Demo</span>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
              {examples[activeTab as keyof typeof examples].demo}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
