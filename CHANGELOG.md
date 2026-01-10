# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2026-01-10

### Added
- Comprehensive test suite with Vitest and React Testing Library (18 tests, 100% passing)
- CI/CD workflows for automated testing, linting, and releases
- Bundle size checks to prevent size regressions
- Support for `prefers-reduced-motion` accessibility feature
- Console warnings for invalid blurhash strings
- LICENSE file (MIT)
- CHANGELOG.md for version history tracking

### Changed
- Upgraded to automatic JSX runtime (react-jsx) for better React 18+ compatibility
- Improved TypeScript configuration with source maps and declaration maps
- Cross-platform build scripts using rimraf instead of rm -rf
- Enhanced package.json with homepage, bugs, sideEffects, and files fields

### Fixed
- Memory leak from canvas element not being cleaned up
- Memory leak from IntersectionObserver not disconnecting on unmount
- Race condition in blurhash rendering when image loads quickly
- Blurhash decode failures now logged as warnings instead of silent failures
- Fade animations now respect `prefers-reduced-motion` user preference

## [0.2.0] - 2024

### Added
- TypeScript support with full type definitions
- Blurhash placeholder support
- LQIP (Low Quality Image Placeholder) support
- Responsive image support with srcSet and picture element
- Fade-in animation with configurable duration
- Error handling with custom fallback UI
- Priority loading for above-the-fold images
- Configurable preload margin for IntersectionObserver
- Aspect ratio support
- Custom className and style props
- SSR safety checks

### Changed
- Rewrote component with modern React hooks
- Improved performance with IntersectionObserver
- Reduced bundle size to ~1.4KB gzipped

## [0.1.0] - Initial Release

### Added
- Basic lazy loading functionality
- IntersectionObserver-based viewport detection
- Native lazy loading fallback
- Placeholder image support

[Unreleased]: https://github.com/garrettsiegel/react-lzy-img/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/garrettsiegel/react-lzy-img/releases/tag/v0.3.0
[0.2.0]: https://github.com/garrettsiegel/react-lzy-img/releases/tag/v0.2.0
[0.1.0]: https://github.com/garrettsiegel/react-lzy-img/releases/tag/v0.1.0
