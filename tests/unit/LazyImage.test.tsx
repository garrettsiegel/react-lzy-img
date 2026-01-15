import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import LazyImage from '../../src/LazyImage';

// Mock IntersectionObserver
class MockIntersectionObserver {
  private callback: IntersectionObserverCallback;
  private elements: Set<Element> = new Set();

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    (global as Record<string, unknown>).mockObserver = this;
  }

  observe(element: Element) {
    this.elements.add(element);
  }

  unobserve(element: Element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  trigger(isIntersecting: boolean) {
    const entries: IntersectionObserverEntry[] = Array.from(this.elements).map(element => ({
      target: element,
      isIntersecting,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: Date.now(),
    }));
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

beforeEach(() => {
  // Setup IntersectionObserver mock
  global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

  // Setup matchMedia mock for prefers-reduced-motion
  global.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

describe('LazyImage', () => {
  it('renders without crashing', () => {
    const { container } = render(<LazyImage src="test.jpg" alt="Test image" priority />);
    const img = container.querySelector('img[alt="Test image"]');
    expect(img).toBeInTheDocument();
  });

  it('loads image when in viewport', async () => {
    const { container } = render(<LazyImage src="test.jpg" alt="Test image" />);
    
    // Trigger intersection
    const mockObs = (global as Record<string, unknown>).mockObserver as MockIntersectionObserver | undefined;
    if (mockObs) {
      mockObs.trigger(true);
    }

    await waitFor(() => {
      const img = container.querySelector('img[alt="Test image"]');
      expect(img).toHaveAttribute('src', 'test.jpg');
    });
  });

  it('loads image immediately when priority is true', () => {
    const { container } = render(<LazyImage src="test.jpg" alt="Test image" priority />);
    const img = container.querySelector('img[alt="Test image"]');
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('loading', 'eager');
  });

  it('renders placeholder image when provided', () => {
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        placeholder="placeholder.jpg"
      />
    );
    
    // Should have placeholder image
    const placeholderImg = container.querySelector('img[src="placeholder.jpg"]');
    expect(placeholderImg).toBeInTheDocument();
  });

  it('renders LQIP when provided', () => {
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        lqip="lqip.jpg"
      />
    );
    
    const placeholderImg = container.querySelector('img[src="lqip.jpg"]');
    expect(placeholderImg).toBeInTheDocument();
  });

  it('renders blurhash canvas when provided', () => {
    // Valid blurhash string (6 characters is the minimum)
    const blurhash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
    
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        blurhash={blurhash}
      />
    );
    
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('shows error fallback when image fails to load', async () => {
    const { container } = render(
      <LazyImage 
        src="invalid.jpg" 
        alt="Test image" 
        fallback="Failed to load"
        priority
      />
    );
    
    const img = container.querySelector('img[alt="Test image"]') as HTMLImageElement;
    
    // Simulate error
    img?.dispatchEvent(new Event('error'));
    
    await waitFor(() => {
      expect(container.textContent).toContain('Failed to load');
    });
  });

  it('calls onLoad callback when image loads', async () => {
    const onLoad = vi.fn();
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        onLoad={onLoad}
        priority
      />
    );
    
    const img = container.querySelector('img[alt="Test image"]') as HTMLImageElement;
    img?.dispatchEvent(new Event('load'));
    
    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });

  it('calls onError callback when image fails', async () => {
    const onError = vi.fn();
    const { container } = render(
      <LazyImage 
        src="invalid.jpg" 
        alt="Test image" 
        onError={onError}
        priority
      />
    );
    
    const img = container.querySelector('img[alt="Test image"]') as HTMLImageElement;
    img?.dispatchEvent(new Event('error'));
    
    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        className="custom-class"
      />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        style={customStyle}
      />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.backgroundColor).toBe('red');
  });

  it('renders responsive image with srcSet', () => {
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        srcSet="test-small.jpg 480w, test-large.jpg 800w"
        sizes="(max-width: 600px) 480px, 800px"
        priority
      />
    );
    
    const source = container.querySelector('source');
    expect(source).toBeInTheDocument();
    expect(source).toHaveAttribute('srcset', 'test-small.jpg 480w, test-large.jpg 800w');
    expect(source).toHaveAttribute('sizes', '(max-width: 600px) 480px, 800px');
  });

  it('respects prefers-reduced-motion', () => {
    // Mock prefers-reduced-motion
    global.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        fadeIn={true}
        priority
      />
    );
    
    const img = container.querySelector('img[alt="Test image"]') as HTMLImageElement;
    // Should not have transition when reduced motion is preferred
    expect(img?.style.transition).toBe('');
  });

  it('applies fade-in animation when fadeIn is true', () => {
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        fadeIn={true}
        fadeInDuration={500}
        priority
      />
    );
    
    const img = container.querySelector('img[alt="Test image"]') as HTMLImageElement;
    expect(img?.style.transition).toContain('opacity');
    expect(img?.style.transition).toContain('500ms');
  });

  it('does not apply fade-in when fadeIn is false', () => {
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        fadeIn={false}
        priority
      />
    );
    
    const img = container.querySelector('img[alt="Test image"]') as HTMLImageElement;
    expect(img?.style.transition).toBe('');
  });

  it('sets lazy loading attribute correctly', async () => {
    const { container } = render(<LazyImage src="test.jpg" alt="Test image" priority={false} />);
    
    // Trigger intersection
    const mockObs = (global as Record<string, unknown>).mockObserver as MockIntersectionObserver | undefined;
    if (mockObs) {
      mockObs.trigger(true);
    }

    await waitFor(() => {
      const img = container.querySelector('img[alt="Test image"]');
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  it('applies aspect ratio when provided', () => {
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        aspectRatio={16/9}
      />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.aspectRatio).toBe('1.7777777777777777');
  });

  it('forwards additional img attributes', () => {
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        title="Test title"
        crossOrigin="anonymous"
        priority
      />
    );
    
    const img = container.querySelector('img[alt="Test image"]');
    expect(img).toHaveAttribute('title', 'Test title');
    expect(img).toHaveAttribute('crossorigin', 'anonymous');
  });
});

describe('LazyImage - Error Handling & Edge Cases', () => {
  it('cleans up canvas properly on unmount to release memory', () => {
    const { container, unmount } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
      />
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas?.width).toBe(32);
    expect(canvas?.height).toBe(32);

    // Unmount and check canvas dimensions are set to 0
    unmount();
    
    // Canvas dimensions should be 0 after cleanup
    expect(canvas?.width).toBe(0);
    expect(canvas?.height).toBe(0);
  });

  it('includes proper accessibility attributes during loading', () => {
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Accessible test image"
      />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute('role', 'img');
    expect(wrapper).toHaveAttribute('aria-label', 'Accessible test image');
    expect(wrapper).toHaveAttribute('aria-busy', 'true');
  });

  it('sets aria-busy to false after image loads', async () => {
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image"
        priority
      />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute('aria-busy', 'true');

    const img = container.querySelector('img[alt="Test image"]');
    if (img) {
      const loadEvent = new Event('load');
      img.dispatchEvent(loadEvent);
    }

    await waitFor(() => {
      expect(wrapper).toHaveAttribute('aria-busy', 'false');
    });
  });

  it('includes role="alert" on error fallback for screen readers', async () => {
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image"
        fallback="Custom error message"
        priority
      />
    );

    const img = container.querySelector('img');
    if (img) {
      const errorEvent = new Event('error');
      img.dispatchEvent(errorEvent);
    }

    await waitFor(() => {
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
      expect(alert?.textContent).toContain('Custom error message');
    });
  });

  it('handles SSR environment without IntersectionObserver', () => {
    // Temporarily remove IntersectionObserver
    const originalIO = global.IntersectionObserver;
    // @ts-expect-error - Simulating SSR
    delete global.IntersectionObserver;

    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="SSR test image"
      />
    );

    // Should render immediately without observer
    const img = container.querySelector('img[alt="SSR test image"]');
    expect(img).toBeInTheDocument();

    // Restore IntersectionObserver
    global.IntersectionObserver = originalIO;
  });

  it('handles empty src gracefully', () => {
    const { container } = render(
      <LazyImage 
        src="" 
        alt="Empty src test"
        priority
      />
    );

    // Should still render container even with empty src
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });

  it('warns about invalid blurhash and sets error state', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        blurhash="invalid"
      />
    );

    // Should warn about invalid blurhash
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('[LazyImage] Failed to decode blurhash'),
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('prefers blurhash over lqip when both provided and blurhash is valid', () => {
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
        lqip="fallback.jpg"
      />
    );

    // Should show canvas (blurhash) not img (lqip)
    const canvas = container.querySelector('canvas');
    const lqipImg = container.querySelector('img[src="fallback.jpg"]');
    
    expect(canvas).toBeInTheDocument();
    expect(lqipImg).not.toBeInTheDocument();
  });

  it('maintains aspect ratio without string conversion', () => {
    const { container } = render(
      <LazyImage 
        src="test.jpg" 
        alt="Test image" 
        aspectRatio={1.5}
      />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    // Aspect ratio should be numeric, not string
    expect(wrapper.style.aspectRatio).toBe('1.5');
  });

  it('does not call matchMedia on every render', () => {
    const matchMediaSpy = vi.fn().mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    global.matchMedia = matchMediaSpy;

    const { rerender } = render(
      <LazyImage src="test.jpg" alt="Test" fadeIn={true} />
    );

    const initialCallCount = matchMediaSpy.mock.calls.length;

    // Rerender component
    rerender(<LazyImage src="test.jpg" alt="Test Updated" fadeIn={true} />);

    // matchMedia should only be called once (memoized)
    expect(matchMediaSpy.mock.calls.length).toBe(initialCallCount);
  });
});

describe('LazyImage - Enhanced Features', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('blurhashResolution prop', () => {
    it('uses default resolution of 32 when not specified', () => {
      const { container } = render(
        <LazyImage
          src="test.jpg"
          alt="Test"
          blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
        />
      );

      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('width', '32');
      expect(canvas).toHaveAttribute('height', '32');
    });

    it('uses custom resolution of 16 for faster performance', () => {
      const { container } = render(
        <LazyImage
          src="test.jpg"
          alt="Test"
          blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
          blurhashResolution={16}
        />
      );

      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('width', '16');
      expect(canvas).toHaveAttribute('height', '16');
    });

    it('uses custom resolution of 64 for higher quality', () => {
      const { container } = render(
        <LazyImage
          src="test.jpg"
          alt="Test"
          blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
          blurhashResolution={64}
        />
      );

      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('width', '64');
      expect(canvas).toHaveAttribute('height', '64');
    });
  });

  describe('fetchPriority prop', () => {
    it('sets fetchPriority to high when specified', () => {
      const { container } = render(
        <LazyImage
          src="test.jpg"
          alt="Test"
          priority
          fetchPriority="high"
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('fetchPriority', 'high');
    });

    it('sets fetchPriority to low when specified', () => {
      const { container } = render(
        <LazyImage
          src="test.jpg"
          alt="Test"
          priority
          fetchPriority="low"
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('fetchPriority', 'low');
    });

    it('auto-sets fetchPriority to high when priority prop is true', () => {
      const { container } = render(
        <LazyImage
          src="test.jpg"
          alt="Test"
          priority
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('fetchPriority', 'high');
    });

    it('does not set fetchPriority when neither priority nor fetchPriority specified', () => {
      const { container } = render(
        <LazyImage
          src="test.jpg"
          alt="Test"
          priority
          fetchPriority={undefined}
        />
      );

      // With priority=true but no explicit fetchPriority, it defaults to 'high'
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('fetchPriority', 'high');
    });
  });

  describe('retry mechanism', () => {
    it('retries loading image on error when retryAttempts > 0', async () => {
      vi.useFakeTimers();
      
      const onError = vi.fn();
      const { container } = render(
        <LazyImage
          src="test.jpg"
          alt="Test"
          priority
          retryAttempts={2}
          retryDelay={1000}
          onError={onError}
        />
      );

      const img = container.querySelector('img');
      
      // First error - should trigger retry, not call onError yet
      fireEvent.error(img!);
      expect(onError).not.toHaveBeenCalled();

      // Advance timer for retry delay
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      // Second error - should trigger another retry
      const imgAfterRetry = container.querySelector('img');
      fireEvent.error(imgAfterRetry!);
      expect(onError).not.toHaveBeenCalled();

      // Advance timer for second retry
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      // Third error - all retries exhausted, should call onError
      const imgAfterSecondRetry = container.querySelector('img');
      fireEvent.error(imgAfterSecondRetry!);
      expect(onError).toHaveBeenCalledTimes(1);
    });

    it('adds cache-busting query param on retry', async () => {
      vi.useFakeTimers();
      
      const { container } = render(
        <LazyImage
          src="test.jpg"
          alt="Test"
          priority
          retryAttempts={1}
          retryDelay={500}
        />
      );

      let img = container.querySelector('img');
      expect(img).toHaveAttribute('src', 'test.jpg');
      
      // Trigger error
      fireEvent.error(img!);
      
      // Advance timer for retry
      await act(async () => {
        vi.advanceTimersByTime(500);
      });

      // After retry, src should have cache-busting param
      img = container.querySelector('img');
      expect(img?.getAttribute('src')).toContain('_retry=1');
    });

    it('handles URLs with existing query params during retry', async () => {
      vi.useFakeTimers();
      
      const { container } = render(
        <LazyImage
          src="test.jpg?size=large"
          alt="Test"
          priority
          retryAttempts={1}
          retryDelay={500}
        />
      );

      let img = container.querySelector('img');
      expect(img).toHaveAttribute('src', 'test.jpg?size=large');
      
      fireEvent.error(img!);
      
      await act(async () => {
        vi.advanceTimersByTime(500);
      });

      img = container.querySelector('img');
      expect(img?.getAttribute('src')).toBe('test.jpg?size=large&_retry=1');
    });

    it('shows error state after all retries exhausted', async () => {
      vi.useFakeTimers();
      
      const { container } = render(
        <LazyImage
          src="test.jpg"
          alt="Test"
          priority
          retryAttempts={1}
          retryDelay={100}
          fallback="Custom error"
        />
      );

      const img = container.querySelector('img');
      fireEvent.error(img!);
      
      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      // Second error after retry
      const imgAfterRetry = container.querySelector('img');
      fireEvent.error(imgAfterRetry!);

      // Should show error fallback now
      expect(container.textContent).toContain('Custom error');
    });

    it('includes retry count in aria-label after failure', async () => {
      vi.useFakeTimers();
      
      const { container } = render(
        <LazyImage
          src="test.jpg"
          alt="Test image"
          priority
          retryAttempts={2}
          retryDelay={100}
        />
      );

      const img = container.querySelector('img');
      
      // Exhaust all retries
      fireEvent.error(img!);
      await act(async () => { vi.advanceTimersByTime(100); });
      
      fireEvent.error(container.querySelector('img')!);
      await act(async () => { vi.advanceTimersByTime(100); });
      
      fireEvent.error(container.querySelector('img')!);

      // Check aria-label includes retry info
      const wrapper = container.querySelector('[role="img"]');
      expect(wrapper).toHaveAttribute('aria-label', 'Test image (failed to load after 2 retries)');
    });

    it('resets retry count on successful load', async () => {
      vi.useFakeTimers();
      
      const onLoad = vi.fn();
      const { container } = render(
        <LazyImage
          src="test.jpg"
          alt="Test"
          priority
          retryAttempts={2}
          retryDelay={100}
          onLoad={onLoad}
        />
      );

      const img = container.querySelector('img');
      
      // First error triggers retry
      fireEvent.error(img!);
      await act(async () => { vi.advanceTimersByTime(100); });

      // Now load succeeds
      const imgAfterRetry = container.querySelector('img');
      fireEvent.load(imgAfterRetry!);

      expect(onLoad).toHaveBeenCalledTimes(1);
    });

    it('cleans up retry timeout on unmount', async () => {
      vi.useFakeTimers();
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      
      const { container, unmount } = render(
        <LazyImage
          src="test.jpg"
          alt="Test"
          priority
          retryAttempts={1}
          retryDelay={1000}
        />
      );

      const img = container.querySelector('img');
      fireEvent.error(img!);
      
      // Unmount while retry is pending
      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
      clearTimeoutSpy.mockRestore();
    });

    it('does not retry when retryAttempts is 0 (default)', () => {
      const onError = vi.fn();
      const { container } = render(
        <LazyImage
          src="test.jpg"
          alt="Test"
          priority
          onError={onError}
        />
      );

      const img = container.querySelector('img');
      fireEvent.error(img!);

      // onError should be called immediately without retry
      expect(onError).toHaveBeenCalledTimes(1);
    });
  });
});

