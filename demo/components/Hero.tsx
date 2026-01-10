import { ArrowRightIcon, StarIcon, BoltIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-400/30 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8 animate-fade-in-up">
            <BoltIcon className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-semibold text-white">Lightning Fast Image Loading</span>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-none">
              react-lzy-img
            </h1>
          </div>
          <p className="text-2xl sm:text-3xl text-blue-50 mb-12 max-w-4xl mx-auto font-medium leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            The lightweight React library for blazing-fast lazy loading with zero configuration
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <a
              href="https://www.npmjs.com/package/react-lzy-img"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 hover:scale-105 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              Get Started
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://github.com/garrettsiegel/react-lzy-img"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              <StarIcon className="w-5 h-5 text-yellow-300" />
              View on GitHub
            </a>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center items-center text-white/90 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-2">
              <CheckBadgeIcon className="w-5 h-5 text-green-300" />
              <span className="font-semibold">1.4KB Gzipped</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckBadgeIcon className="w-5 h-5 text-green-300" />
              <span className="font-semibold">TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckBadgeIcon className="w-5 h-5 text-green-300" />
              <span className="font-semibold">88% Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckBadgeIcon className="w-5 h-5 text-green-300" />
              <span className="font-semibold">Zero Config</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)"/>
        </svg>
      </div>
    </div>
  );
}
