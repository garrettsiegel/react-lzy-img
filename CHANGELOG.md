# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2026-01-10

### Added
- Abort controller for image loading cleanup on unmount
- Comprehensive accessibility attributes (`aria-busy`, `role="img"`, `aria-label`)
- Error state for blurhash decode failures with fallback to alternative placeholders
- Named constant `BLURHASH_CANVAS_SIZE` for canvas dimensions
- CHANGELOG.md for tracking version history
- CONTRIBUTING.md with comprehensive contribution guidelines
- SECURITY.md with vulnerability reporting process
- Dependabot configuration for automated dependency updates
- `.nvmrc` file for Node.js version consistency
- `.editorconfig` for consistent coding styles
- `engines` field in package.json specifying Node >=18.0.0
- `funding` field in package.json

### Changed
- Optimized `matchMedia` call using `useMemo` to prevent re-evaluation on every render
- Improved canvas cleanup to properly release memory by setting dimensions to 0
- Enhanced error fallback with `role="alert"` for screen reader announcements
- Blurhash placeholder now gracefully falls back to LQIP/placeholder on decode errors
- Aspect ratio handling now uses numeric values instead of string conversion

### Fixed
- Memory leak in canvas cleanup - now properly releases resources
- Performance issue with `matchMedia` being called on every render
- Accessibility gaps in loading and error states
- Race condition where blurhash would render briefly even after image loaded

### Tests
- Added 10 comprehensive test cases for error handling and edge cases
- Added tests for canvas memory cleanup verification
- Added tests for accessibility attributes
- Added tests for SSR environment handling
- All 28 tests passing with improved coverage

## [0.5.0] - 2024-XX-XX

### Added
- Initial public release
- Lazy loading with IntersectionObserver
- Multiple placeholder types: blurhash, LQIP, regular images
- Responsive image support with srcSet and sizes
- Priority loading mode
- Customizable fade-in transitions
- SSR support
- Native lazy loading fallback
- Respects prefers-reduced-motion
- TypeScript support with full type definitions
- Zero external CSS dependencies

### Features
- Lightweight bundle size (~1.4KB gzipped)
- React 18/19 support
- Tree-shakeable ESM and CJS exports
- Comprehensive test coverage
- Extensive API with intuitive prop design

[Unreleased]: https://github.com/garrettsiegel/react-lzy-img/compare/v0.6.0...HEAD
[0.6.0]: https://github.com/garrettsiegel/react-lzy-img/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/garrettsiegel/react-lzy-img/releases/tag/v0.5.0
