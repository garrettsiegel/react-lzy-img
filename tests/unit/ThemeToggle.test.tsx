import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeToggle } from '../../website/components/ThemeToggle';

interface MatchMediaMock extends MediaQueryList {
  triggerChange: (matches: boolean) => void;
}

const isMediaQueryListener = (
  listener: EventListenerOrEventListenerObject
): listener is EventListener => {
  return typeof listener === 'function';
};

const mockMatchMedia = (initialMatches: boolean): void => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string): MatchMediaMock => {
      let currentMatches = initialMatches;
      const listeners = new Set<EventListener>();

      return {
        media: query,
        matches: currentMatches,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((_type: string, listener: EventListenerOrEventListenerObject) => {
          if (isMediaQueryListener(listener)) {
            listeners.add(listener);
          }
        }),
        removeEventListener: vi.fn((_type: string, listener: EventListenerOrEventListenerObject) => {
          if (isMediaQueryListener(listener)) {
            listeners.delete(listener);
          }
        }),
        dispatchEvent: vi.fn(),
        triggerChange: (nextMatches: boolean) => {
          currentMatches = nextMatches;
          const event = { matches: nextMatches, media: query } as MediaQueryListEvent;
          listeners.forEach((listener) => listener(event as unknown as Event));
        },
      };
    }),
  });
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('applies system dark mode by default when preferred', async () => {
    mockMatchMedia(true);

    render(<ThemeToggle />);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  it('toggles and persists explicit theme selection', async () => {
    mockMatchMedia(false);

    render(<ThemeToggle />);

    const toggleButton = screen.getByRole('button', { name: 'Switch to dark theme' });
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(window.localStorage.getItem('react-lzy-img-theme')).toBe('dark');
    });

    const toggleBackButton = screen.getByRole('button', { name: 'Switch to light theme' });
    fireEvent.click(toggleBackButton);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(window.localStorage.getItem('react-lzy-img-theme')).toBe('light');
    });
  });

  it('returns to system preference when system button is used', async () => {
    mockMatchMedia(false);

    render(<ThemeToggle />);

    const toggleButton = screen.getByRole('button', { name: 'Switch to dark theme' });
    fireEvent.click(toggleButton);

    const systemButton = screen.getByRole('button', { name: 'Use system theme' });
    fireEvent.click(systemButton);

    await waitFor(() => {
      expect(window.localStorage.getItem('react-lzy-img-theme')).toBeNull();
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });
});
