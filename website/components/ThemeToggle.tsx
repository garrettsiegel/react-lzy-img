import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
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

  // ============================================================
  // RENDER
  // ============================================================
  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && isSystemDark());

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
  );
}
