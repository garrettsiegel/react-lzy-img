# GitHub Copilot Instructions for react-lzy-img

## Overview

This workspace contains comprehensive frontend development guidelines across multiple skills documents. When working in this codebase, GitHub Copilot should reference and apply these standards based on the context of the work.

## Skills Documentation

### 1. Frontend Development Standards
**Location**: [.github/skills/frontend-dev-work/SKILLS.md](.github/skills/frontend-dev-work/SKILLS.md)

**Scope**: General React 19 + TypeScript + Tailwind CSS development patterns
- Clean code architecture and readability-first approach
- TypeScript strict mode with proper interface definitions
- Zustand state management patterns
- TanStack Query for data fetching with Valibot validation
- Accessibility and SEO best practices
- File size limits (250-300 lines) and code organization

**When to Apply**: 
- Working on core library files in `src/`
- Creating new components or hooks
- General TypeScript/React development
- Code reviews and refactoring

### 2. Design Engineering Standards
**Location**: [.github/skills/design-engineer/SKILLS.md](.github/skills/design-engineer/SKILLS.md)

**Scope**: Design-focused frontend development with aesthetic excellence
- "No AI Slop" philosophy - distinctive, hand-crafted interfaces
- Bold typography and composition choices (avoid Inter, Roboto, system fonts for distinctive UIs)
- Texture, depth, and visual hierarchy (grain, noise, gradients, glassmorphism)
- Vercel-grade UX patterns
- Advanced Tailwind CSS v4 techniques
- High-impact animations and micro-interactions

**When to Apply**:
- Working on the demo website in `website/` directory
- Creating marketing pages or landing pages
- Building distinctive UI components
- Any work requiring strong visual design

## Context-Specific Guidelines

### For Library Code (`src/`)
- **Priority**: Functionality, performance, bundle size, accessibility
- **Standards**: Follow [frontend-dev-work SKILLS.md](.github/skills/frontend-dev-work/SKILLS.md)
- **Design**: Minimal, unopinionated styling using inline styles
- **Exceptions**: The library itself should remain minimalist and flexible

### For Demo Website (`website/`)
- **Priority**: Visual impact, user experience, brand presentation
- **Standards**: Follow [design-engineer SKILLS.md](.github/skills/design-engineer/SKILLS.md)
- **Design**: Bold, distinctive, memorable
- **Typography**: Currently uses Inter (acceptable for this project's demo), but be open to distinctive alternatives
- **Effects**: Leverage gradients, shadows, animations, glassmorphism

### For Tests (`tests/`)
- **Priority**: Coverage, clarity, maintainability
- **Standards**: Follow [frontend-dev-work SKILLS.md](.github/skills/frontend-dev-work/SKILLS.md)
- **Patterns**: Comprehensive test cases, clear test names, mock appropriately
- **Target**: >90% coverage as specified in vitest.config.ts

### For Documentation
- **Priority**: Clarity, completeness, accuracy
- **Standards**: Both skills documents emphasize clear, concise communication
- **Tone**: Professional, helpful, educational
- **Format**: Markdown with proper formatting and code examples

## Reconciling Conflicts

When guidelines conflict between the two skills documents:

1. **Tech Stack**: Both documents specify the same core stack (React 19, TypeScript, Tailwind CSS v4, Zustand, TanStack Query, Valibot). Use these consistently.

2. **Typography**: 
   - Library code: No opinion (users provide their own fonts)
   - Demo website: design-engineer standards take precedence for distinctive choices
   - General rule: Avoid generic defaults when creating demo/marketing UIs

3. **Tailwind Version**:
   - Project currently uses Tailwind v3.4 (see package.json)
   - Both skills docs reference v4 as aspirational
   - Write code compatible with v3.4, but structure it to be v4-ready

4. **Dependencies**:
   - Zustand, TanStack Query, Valibot are NOT in package.json
   - These are recommended patterns for projects USING the library
   - Do not add them to the library itself unless explicitly requested

5. **File Organization**:
   - Both docs specify the same flat directory structure
   - No conflicts here - maintain consistency

## Key Principles (Always Apply)

1. **Named Exports Only**: No default exports
2. **TypeScript Strict Mode**: No `any`, explicit types
3. **Accessibility First**: WCAG 2.1 compliance, semantic HTML, ARIA labels
4. **Performance**: Optimize bundle size, avoid unnecessary re-renders
5. **Testing**: Write tests for new features/fixes, maintain >90% coverage
6. **npm Only**: Use npm, not pnpm or yarn
7. **Conventional Commits**: Follow commit message format in CONTRIBUTING.md

## Pre-Response Checklist

Before providing code, verify:
- [ ] Correct skills document applied based on file location
- [ ] TypeScript types are strict and explicit
- [ ] Accessibility requirements met (focus states, ARIA, semantic HTML)
- [ ] Code is under 300 lines per file
- [ ] Named exports used
- [ ] Commented with ALL CAPS section headers
- [ ] No `any` types, no default exports, no inline props
- [ ] Tests included for new functionality (if applicable)

## Communication Style

Both skills documents emphasize:
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
