import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import {
  observeElement,
  unobserveElement,
  resetObserverPoolForTests,
  getObserverPoolSizeForTests,
} from '../../src/utils/observerPool';

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  private callback: IntersectionObserverCallback;
  private observed = new Set<Element>();
  public disconnect = vi.fn();

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe(element: Element) {
    this.observed.add(element);
  }

  unobserve(element: Element) {
    this.observed.delete(element);
  }

  trigger(entries: Array<{ target: Element; isIntersecting: boolean }>) {
    const observerEntries = entries.map((entry) => ({
      target: entry.target,
      isIntersecting: entry.isIntersecting,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: entry.isIntersecting ? 1 : 0,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: Date.now(),
    }));

    this.callback(observerEntries as IntersectionObserverEntry[], this as unknown as IntersectionObserver);
  }
}

describe('observerPool', () => {
  const originalObserver = globalThis.IntersectionObserver;

  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
    resetObserverPoolForTests();
  });

  afterEach(() => {
    resetObserverPoolForTests();
    globalThis.IntersectionObserver = originalObserver;
  });

  it('reuses a single observer for matching rootMargin values', () => {
    const first = document.createElement('div');
    const second = document.createElement('div');
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    observeElement(first, '200px', firstCallback);
    observeElement(second, '200px', secondCallback);

    expect(MockIntersectionObserver.instances).toHaveLength(1);
    expect(getObserverPoolSizeForTests()).toBe(1);

    const sharedObserver = MockIntersectionObserver.instances[0];
    sharedObserver.trigger([
      { target: first, isIntersecting: true },
      { target: second, isIntersecting: true },
    ]);

    expect(firstCallback).toHaveBeenCalledTimes(1);
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it('creates separate observers for different rootMargin values', () => {
    const first = document.createElement('div');
    const second = document.createElement('div');

    observeElement(first, '100px', vi.fn());
    observeElement(second, '300px', vi.fn());

    expect(MockIntersectionObserver.instances).toHaveLength(2);
    expect(getObserverPoolSizeForTests()).toBe(2);
  });

  it('keeps observer alive until last element is removed', () => {
    const first = document.createElement('div');
    const second = document.createElement('div');

    observeElement(first, '200px', vi.fn());
    observeElement(second, '200px', vi.fn());

    const sharedObserver = MockIntersectionObserver.instances[0];
    unobserveElement(first, '200px');

    expect(sharedObserver.disconnect).not.toHaveBeenCalled();
    expect(getObserverPoolSizeForTests()).toBe(1);

    unobserveElement(second, '200px');

    expect(sharedObserver.disconnect).toHaveBeenCalledTimes(1);
    expect(getObserverPoolSizeForTests()).toBe(0);
  });

  it('falls back gracefully when IntersectionObserver creation fails', () => {
    class ThrowingIntersectionObserver {
      constructor() {
        throw new Error('Invalid rootMargin');
      }
    }

    globalThis.IntersectionObserver = ThrowingIntersectionObserver as unknown as typeof IntersectionObserver;

    const element = document.createElement('div');
    const callback = vi.fn();

    observeElement(element, 'invalid-root-margin', callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(getObserverPoolSizeForTests()).toBe(1);

    unobserveElement(element, 'invalid-root-margin');
    expect(getObserverPoolSizeForTests()).toBe(0);
  });
});
