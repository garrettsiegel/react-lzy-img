import { ArrowRightIcon, StarIcon, BoltIcon, CheckCircleIcon, CodeBracketIcon } from '@heroicons/react/24/solid';

export function Hero() {
  // ============================================================
  // HANDLERS
  // ============================================================
  const scrollToExamples = () => {
    const element = document.getElementById('examples');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 noise-texture pt-16">
      {/* ANIMATED BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl" 
          style={{
            animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            willChange: 'opacity',
          }}
        ></div>
        <div 
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-400/20 to-transparent rounded-full blur-3xl" 
          style={{
            animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: '2s',
            willChange: 'opacity',
          }}
        ></div>
      </div>
      
      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8 animate-fade-in-up">
            <BoltIcon className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-semibold text-white">Lightning Fast Image Loading</span>
          </div>
          
          {/* HEADLINE */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-none">
              react-lzy-img
            </h1>
          </div>
          
          {/* VALUE PROPOSITION */}
          <p className="text-xl sm:text-2xl text-blue-50 mb-4 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Stop losing users to slow-loading images.
          </p>
          <p className="text-lg sm:text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-normal leading-relaxed animate-fade-in-up" style={{animationDelay: '0.25s'}}>
            Ship faster pages with lazy loading, responsive images, and smart placeholders — all in <span className="font-black text-white">1.4KB</span>.
          </p>
          
          {/* CTA BUTTONS WITH FLOATING BADGES */}
          <div className="relative flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up max-w-5xl mx-auto px-4" style={{animationDelay: '0.3s'}}>
            {/* FLOATING BADGE - TEST COVERAGE */}
            <div 
              className="hidden 2xl:block absolute left-0 top-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-xl animate-fade-in-up noise-texture"
              style={{
                animationDelay: '0.5s',
                transform: 'translateY(-50%) rotate(-3deg)',
              }}
            >
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-400" />
                <div className="text-left">
                  <div className="text-xl font-black text-white leading-none">88%</div>
                  <div className="text-xs text-white/60 uppercase tracking-wide">Tested</div>
                </div>
              </div>
            </div>

            {/* FLOATING BADGE - TYPESCRIPT */}
            <div 
              className="hidden 2xl:block absolute right-0 top-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-xl animate-fade-in-up noise-texture"
              style={{
                animationDelay: '0.6s',
                transform: 'translateY(-50%) rotate(2deg)',
              }}
            >
              <div className="flex items-center gap-2">
                <CodeBracketIcon className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <div className="text-xl font-black text-white leading-none">100%</div>
                  <div className="text-xs text-white/60 uppercase tracking-wide">TypeScript</div>
                </div>
              </div>
            </div>

            <button
              onClick={scrollToExamples}
              className="group inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 hover:scale-[1.02] shadow-2xl hover:shadow-blue-500/50 transition-all duration-200 focus-ring"
            >
              Try Interactive Demo
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="https://www.npmjs.com/package/react-lzy-img"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 hover:scale-[1.02] transition-all duration-200 focus-ring"
            >
              Read Docs
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://github.com/garrettsiegel/react-lzy-img"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-blue-100 px-4 py-4 rounded-xl font-semibold transition-colors focus-ring"
            >
              <StarIcon className="w-5 h-5 text-yellow-300" />
              Star on GitHub
            </a>
          </div>
        </div>
      </div>
      
      {/* WAVE DIVIDER */}
      <div className="absolute bottom-0 left-0 right-0 -mb-px">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)"/>
        </svg>
      </div>
    </div>
  );
}
