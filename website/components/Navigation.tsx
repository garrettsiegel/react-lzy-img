import { useEffect, useRef, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { id: 'features', label: 'Features' },
  { id: 'examples', label: 'Examples' },
  { id: 'installation', label: 'Install' },
] as const;

type SectionId = 'hero' | 'features' | 'examples' | 'installation';
const OBSERVED_SECTIONS: SectionId[] = ['hero', 'features', 'examples', 'installation'];

export function Navigation() {
  // ============================================================
  // STATE
  // ============================================================
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // ============================================================
  // EFFECTS
  // ============================================================
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-45% 0px -45% 0px',
      }
    );

    OBSERVED_SECTIONS.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const menuElement = mobileMenuRef.current;
    if (!menuElement) {
      return;
    }

    const focusableElements = Array.from(
      menuElement.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    );

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const previousOverflow = document.body.style.overflow;

    firstElement.focus();
    document.body.style.overflow = 'hidden';

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [isMobileMenuOpen]);

  // ============================================================
  // HANDLERS
  // ============================================================
  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'glass border-b border-gray-200/80 dark:border-gray-800/80'
            : 'bg-transparent'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <button
            onClick={() => scrollToSection('hero')}
            className="focus-ring rounded-md px-2 py-1 text-lg font-black tracking-tighter text-gray-900 transition-colors hover:text-indigo-600 dark:text-gray-100 dark:hover:text-indigo-400"
          >
            react-lzy-img
          </button>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={`focus-ring rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  activeSection === item.id
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            <ThemeToggle />

            <a
              href="https://github.com/garrettsiegel/react-lzy-img"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring ml-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-white"
            >
              GitHub
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus-ring rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          role="dialog"
          aria-label="Mobile navigation"
          className="border-t border-gray-200 bg-white py-4 dark:border-gray-800 dark:bg-gray-950 md:hidden"
        >
          <div className="space-y-2 px-4">
            <div className="pb-2">
              <ThemeToggle />
            </div>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={`focus-ring block w-full rounded-md px-4 py-3 text-left text-base font-semibold transition-colors ${
                  activeSection === item.id
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://github.com/garrettsiegel/react-lzy-img"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring block rounded-md border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
      </nav>
    </>
  );
}
