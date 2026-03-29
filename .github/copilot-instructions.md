# GitHub Copilot Instructions for react-lzy-img

## Overview

This workspace contains a TypeScript React image library and a demo website. Use context-aware guidance by directory and keep all updates aligned with the current public API.

## Current Public API (v0.8.0)

Exports from `src/index.ts`:
- `LazyImage`
- `LazyImageProps`
- `useLazyLoad`
- `UseLazyLoadReturn`

Current feature set includes:
- Lazy loading with shared IntersectionObserver pooling by `preloadMargin`
- Responsive image support via `srcSet` and `sizes`
- Placeholder support via `blurhash`, `lqip`, and `placeholder`
- Retry support with `retryAttempts`, `retryDelay`, and `retryBackoff`
- Accessibility features including `loadingLabel` and semantic ARIA attributes
- Minimal bundle footprint with strict TypeScript support

## Authoritative Instruction Files

Use these repo-native instruction files when they apply:

1. `.github/instructions/react-dr.instructions.md`
   - Applies to `**/*.tsx`, `**/*.ts`, `**/*.jsx`
   - Run `react-dr-cli` diagnostics after meaningful edits in matched files

2. `.github/instructions/react-typescript.instructions.md`
   - Applies to `**/*.{tsx,jsx}`
   - Enforces React + TypeScript component standards and safe refactor constraints

## Context-Specific Guidelines

### For Library Code (`src/`)
- **Priority**: Functionality, performance, bundle size, accessibility
- **Design**: Minimal and unopinionated; library styling should stay inline and flexible
- **API Stability**: Preserve public types and named exports unless explicitly requested

### For Demo Website (`website/`)
- **Priority**: Visual impact, user experience, brand presentation
- **Design**: Bold, distinctive, and polished
- **Effects**: Use gradients, depth, animation, and strong hierarchy while preserving accessibility
- **Messaging**: Keep examples and feature claims synchronized with current package behavior

### For Tests (`tests/`)
- **Priority**: Coverage, clarity, maintainability
- **Patterns**: Comprehensive test cases, clear test names, mock appropriately
- **Target**: Maintain at least 80% coverage thresholds as specified in `vitest.config.ts`, and keep practical coverage high

### For Documentation
- **Priority**: Clarity, completeness, accuracy
- **Tone**: Professional, helpful, educational
- **Format**: Markdown with proper formatting and code examples

## Project Realities

1. **Tailwind Version**:
   - Project currently uses Tailwind v3.4
   - Keep changes compatible with v3.4

2. **Dependencies**:
   - Library runtime dependency is intentionally minimal
   - Do not add Zustand, TanStack Query, or Valibot to the library unless explicitly requested

3. **Architecture**:
   - Preserve simple flat structure in `src/`, `tests/`, and `website/`
   - Prefer incremental, behavior-preserving refactors

## Key Principles (Always Apply)

1. **Named Exports Only**: No default exports
2. **TypeScript Strict Mode**: No `any`, explicit types
3. **Accessibility First**: WCAG 2.1 compliance, semantic HTML, ARIA labels
4. **Performance**: Optimize bundle size, avoid unnecessary re-renders
5. **Testing**: Write tests for new features/fixes, maintain coverage >= configured thresholds (80% minimum)
6. **npm Only**: Use npm, not pnpm or yarn
7. **Conventional Commits**: Follow commit message format in CONTRIBUTING.md

## Pre-Response Checklist

Before providing code, verify:
- [ ] Applicable `.github/instructions/*.md` guidance applied based on file type
- [ ] TypeScript types are strict and explicit
- [ ] Accessibility requirements met (focus states, ARIA, semantic HTML)
- [ ] Code is under 300 lines per file
- [ ] Named exports used
- [ ] Commented with ALL CAPS section headers
- [ ] No `any` types, no default exports, no inline props
- [ ] Tests included for new functionality (if applicable)
- [ ] React diagnostics run for TS/TSX/JSX edits via `react-dr-cli`

## Communication Style

Communication in this repository should be:
- **Concise & Direct**: Code first, no filler phrases
- **No Summaries**: Don't list changes unless asked
- **Educational**: Explain complex patterns briefly
- **Proactive**: Suggest improvements when patterns could be better

## Resources

- Main README: [README.md](../README.md)
- Contributing Guide: [CONTRIBUTING.md](../CONTRIBUTING.md)
- Security Policy: [SECURITY.md](../SECURITY.md)
- Changelog: [CHANGELOG.md](../CHANGELOG.md)

---

**When in doubt**: Prioritize accessibility, performance, and maintainability. Ask for clarification rather than making assumptions about design or architecture decisions.
