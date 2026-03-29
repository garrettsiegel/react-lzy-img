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
  const features = [
    {
      icon: BoltIcon,
      title: 'Lazy Loading',
      description: 'Loads images only when needed, reducing initial payload and improving real page speed.',
    },
    {
      icon: PhotoIcon,
      title: 'Smart Placeholders',
      description: 'Supports blurhash, LQIP, and standard placeholders so loading states look intentional.',
    },
    {
      icon: CodeBracketIcon,
      title: 'TypeScript First',
      description: 'Strict typings and polished IntelliSense without extra setup.',
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Responsive Images',
      description: 'Works with srcSet and sizes for the right image at the right viewport.',
    },
    {
      icon: CubeIcon,
      title: 'Lightweight',
      description: 'Small bundle footprint with tree-shakable exports.',
    },
    {
      icon: UserGroupIcon,
      title: 'Accessible',
      description: 'Includes semantic loading states and screen-reader friendly behavior.',
    },
  ];

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="border-y border-gray-200 bg-gray-50 py-20 dark:border-gray-800 dark:bg-gray-900 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-14 max-w-3xl">
          <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
            Built for modern React image performance
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Focused primitives, strong defaults, and a minimal API that ships cleanly in production.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const IconComponent = feature.icon;

            return (
              <div key={feature.title} className="group animate-stagger">
                <div className="flex items-center gap-3">
                  <IconComponent className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                  <h3 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
