type IntersectionCallback = () => void;

interface ObserverEntry {
  observer: IntersectionObserver;
  callbacks: WeakMap<Element, IntersectionCallback>;
  activeElements: Set<Element>;
}

const observerPool = new Map<string, ObserverEntry>();

function createFallbackObserver(callbacks: WeakMap<Element, IntersectionCallback>): IntersectionObserver {
  return {
    observe(element: Element) {
      const callback = callbacks.get(element);
      if (callback) {
        callback();
      }
    },
    unobserve() {
      return undefined;
    },
    disconnect() {
      return undefined;
    },
    takeRecords() {
      return [];
    },
    root: null,
    rootMargin: '0px',
    thresholds: [],
  } as unknown as IntersectionObserver;
}

function assertTestHelperAccess(): void {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Observer pool test helpers are not available in production builds.');
  }
}

function createObserver(rootMargin: string): ObserverEntry {
  const callbacks = new WeakMap<Element, IntersectionCallback>();
  const activeElements = new Set<Element>();

  try {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const callback = callbacks.get(entry.target);
          if (callback) {
            callback();
          }
        }
      },
      { rootMargin }
    );

    return { observer, callbacks, activeElements };
  } catch {
    const observer = createFallbackObserver(callbacks);
    return { observer, callbacks, activeElements };
  }
}

function getObserver(rootMargin: string): ObserverEntry {
  const existing = observerPool.get(rootMargin);
  if (existing) {
    return existing;
  }

  const created = createObserver(rootMargin);
  observerPool.set(rootMargin, created);
  return created;
}

export function observeElement(
  element: Element,
  rootMargin: string,
  onIntersect: IntersectionCallback
): void {
  const entry = getObserver(rootMargin);
  entry.callbacks.set(element, onIntersect);
  entry.activeElements.add(element);
  entry.observer.observe(element);
}

export function unobserveElement(element: Element, rootMargin: string): void {
  const entry = observerPool.get(rootMargin);
  if (!entry) {
    return;
  }

  entry.callbacks.delete(element);
  entry.activeElements.delete(element);
  entry.observer.unobserve(element);

  if (entry.activeElements.size === 0) {
    entry.observer.disconnect();
    observerPool.delete(rootMargin);
  }
}

export function resetObserverPoolForTests(): void {
  assertTestHelperAccess();
  for (const entry of observerPool.values()) {
    entry.observer.disconnect();
  }
  observerPool.clear();
}

export function getObserverPoolSizeForTests(): number {
  assertTestHelperAccess();
  return observerPool.size;
}
