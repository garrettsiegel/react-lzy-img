import {
  BoltIcon,
  DevicePhoneMobileIcon,
  PhotoIcon,
  CubeTransparentIcon,
  CubeIcon,
  CodeBracketIcon,
  UserGroupIcon,
  PuzzlePieceIcon,
  ArrowPathIcon,
  SignalIcon,
} from '@heroicons/react/24/solid';

export default function Features() {
  const features = [
    {
      icon: BoltIcon,
      title: 'Lazy Loading',
      description: 'IntersectionObserver with loading="lazy" fallback for optimal performance',
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Responsive Images',
      description: 'Automatic <picture> element when srcSet provided, with sizes support',
    },
    {
      icon: PhotoIcon,
      title: 'Smart Placeholders',
      description: 'Blurhash, LQIP, or standard image placeholders with configurable resolution',
    },
    {
      icon: ArrowPathIcon,
      title: 'Error Retry',
      description: 'Automatic retry mechanism with configurable attempts and delays',
    },
    {
      icon: SignalIcon,
      title: 'Fetch Priority',
      description: 'Browser hints for loading priority to optimize performance',
    },
    {
      icon: CubeIcon,
      title: 'Lightweight',
      description: '~1.4KB gzipped with tree-shaking support',
    },
    {
      icon: CodeBracketIcon,
      title: 'TypeScript',
      description: 'Complete type definitions and IntelliSense support',
    },
    {
      icon: UserGroupIcon,
      title: 'Accessible',
      description: 'Built-in ARIA support and screen reader friendly',
    },
    {
      icon: PuzzlePieceIcon,
      title: 'Single Component',
      description: 'One unified LazyImage component handles all use cases',
    },
    {
      icon: CubeTransparentIcon,
      title: 'Zero Config',
      description: 'Works out of the box with sensible defaults',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
      <div className="text-center mb-20">
        <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight">Why Choose react-lzy-img?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
          Everything you need for lazy loading images in modern React applications
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
