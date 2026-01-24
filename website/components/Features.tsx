import {
  BoltIcon,
  PhotoIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CubeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';

export function Features() {
  // ============================================================
  // DATA
  // ============================================================
  const primaryFeatures = [
    {
      icon: BoltIcon,
      title: 'Lazy Loading',
      description: 'Load images only when users scroll to them. Saves bandwidth and speeds up your site dramatically.',
    },
    {
      icon: PhotoIcon,
      title: 'Smart Placeholders',
      description: 'Beautiful blur effects with blurhash, LQIP, or standard placeholders. No blank spaces while loading.',
    },
    {
      icon: CodeBracketIcon,
      title: 'TypeScript First',
      description: 'Complete type definitions, IntelliSense support, and strict type safety out of the box.',
    },
  ];

  const secondaryFeatures = [
    {
      icon: DevicePhoneMobileIcon,
      title: 'Responsive Images',
      description: 'Automatic <picture> element with srcSet/sizes support',
    },
    {
      icon: CubeIcon,
      title: 'Lightweight',
      description: '~1.4KB gzipped with tree-shaking support',
    },
    {
      icon: UserGroupIcon,
      title: 'Accessible',
      description: 'Built-in ARIA support and screen reader friendly',
    },
  ];

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      {/* HEADER */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Everything you need
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
          Production-ready lazy loading for modern React applications
        </p>
      </div>

      {/* PRIMARY FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {primaryFeatures.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 hover:-translate-y-1 cursor-pointer overflow-hidden noise-texture animate-stagger"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* GRADIENT ACCENT */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity" />
              
              {/* CONTENT */}
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECONDARY FEATURES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {secondaryFeatures.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="group flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-200 animate-stagger"
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
