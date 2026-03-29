import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

type ThemePreference = 'light' | 'dark' | 'system';

const THEME_KEY = 'react-lzy-img-theme';
const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';

const isThemePreference = (value: string | null): value is ThemePreference => {
  return value === 'light' || value === 'dark' || value === 'system';
};

const isSystemDark = (): boolean => {
  return window.matchMedia(SYSTEM_THEME_QUERY).matches;
};

const getInitialThemePreference = (): ThemePreference => {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const storedTheme = window.localStorage.getItem(THEME_KEY);
  return isThemePreference(storedTheme) ? storedTheme : 'system';
};

const applyTheme = (theme: ThemePreference): void => {
  const root = document.documentElement;
  const useDarkMode = theme === 'dark' || (theme === 'system' && isSystemDark());
  root.classList.toggle('dark', useDarkMode);
};

export function ThemeToggle() {
  // ============================================================
  // STATE
  // ============================================================
  const [theme, setTheme] = useState<ThemePreference>(getInitialThemePreference);

  // ============================================================
  // EFFECTS
  // ============================================================
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    applyTheme(theme);

    if (theme === 'system') {
      window.localStorage.removeItem(THEME_KEY);
    } else {
      window.localStorage.setItem(THEME_KEY, theme);
    }

    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  // ============================================================
  // HANDLERS
  // ============================================================
  const handleToggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    setTheme(isCurrentlyDark ? 'light' : 'dark');
  };

  const handleUseSystemTheme = () => {
    setTheme('system');
  };

  // ============================================================
  // RENDER
  // ============================================================
  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && isSystemDark());

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleToggleTheme}
        className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-white"
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      </button>
      <button
        type="button"
        onClick={handleUseSystemTheme}
        className="focus-ring hidden rounded-md border border-gray-200 px-2 py-1 text-xs font-semibold text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-900 sm:inline-flex dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-white"
        aria-label="Use system theme"
      >
        System
      </button>
    </div>
  );
}
