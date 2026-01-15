# Contributing to react-lzy-img

Thank you for your interest in contributing to react-lzy-img! We appreciate your time and effort.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Release Process](#release-process)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-lzy-img.git
   cd react-lzy-img
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/garrettsiegel/react-lzy-img.git
   ```

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install dependencies
npm install

# Run type checking
npm run typecheck

# Run tests
npm test

# Build the library
npm run build

# Run the demo website locally
npm run dev
```

### Project Structure

```
react-lzy-img/
├── src/                  # Source code
│   ├── LazyImage.tsx    # Main component
│   └── index.ts         # Entry point
├── tests/               # Test files
│   └── unit/           # Unit tests
├── website/            # Demo website
├── dist/               # Build output
└── scripts/            # Build validation scripts
```

## Making Changes

### Branch Naming

Create a descriptive branch for your changes:

- `feat/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `refactor/code-improvement` - Code refactoring
- `test/test-description` - Test additions/updates
- `chore/maintenance-task` - Maintenance tasks

Example:
```bash
git checkout -b feat/add-loading-priority
```

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test additions or updates
- `chore:` - Maintenance tasks

Example:
```bash
git commit -m "feat: add fetchPriority prop for image loading hints"
git commit -m "fix: resolve memory leak in canvas cleanup"
git commit -m "docs: update API reference with new props"
```

### Keep Your Fork Updated

```bash
git fetch upstream
git rebase upstream/main
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Place unit tests in `tests/unit/`
- Use descriptive test names that explain what is being tested
- Test both success and error paths
- Mock external dependencies appropriately
- Aim for >90% code coverage

Example test:
```tsx
import { render, waitFor, fireEvent } from '@testing-library/react';
import LazyImage from '../src/LazyImage';

describe('LazyImage - Error Handling', () => {
  it('should display fallback when image fails to load', async () => {
    const { container } = render(
      <LazyImage 
        src="invalid-url.jpg" 
        alt="Test" 
        fallback="Custom error message"
      />
    );
    
    const img = container.querySelector('img');
    fireEvent.error(img!);
    
    await waitFor(() => {
      expect(container.textContent).toContain('Custom error message');
    });
  });
});
```

### Type Checking

Ensure TypeScript types are correct:
```bash
npm run typecheck
```

### Linting

Check code style:
```bash
npm run lint
```

## Submitting Changes

### Pull Request Process

1. **Update documentation** if you've changed functionality
2. **Add tests** for new features or bug fixes
3. **Ensure all tests pass**: `npm test`
4. **Run type checking**: `npm run typecheck`
5. **Build successfully**: `npm run build`
6. **Update CHANGELOG.md** under the `[Unreleased]` section
7. **Push to your fork**:
   ```bash
   git push origin feat/your-feature-name
   ```
8. **Open a Pull Request** on GitHub with:
   - Clear title following conventional commits format
   - Description of what changed and why
   - Reference any related issues
   - Screenshots/GIFs for UI changes (if applicable)

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All existing tests pass
- [ ] New tests added for changes
- [ ] Manually tested in browser

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Added/updated documentation
- [ ] Updated CHANGELOG.md
- [ ] No breaking changes (or documented if unavoidable)
```

## Coding Standards

### TypeScript

- Use strict TypeScript (`strict: true`)
- Export types alongside components
- Avoid `any` types - use `unknown` if type is truly unknown
- Use interface for props, type for unions/intersections

### React

- Use functional components with hooks
- Memoize expensive computations with `useMemo`
- Clean up effects properly
- Follow React hooks rules

### Code Style

- Use meaningful variable and function names
- Keep functions small and focused
- Add comments for complex logic
- Use early returns to reduce nesting
- Prefer const over let

### Accessibility

- All images must have alt text
- Use appropriate ARIA attributes
- Respect user preferences (prefers-reduced-motion)
- Ensure keyboard navigation works
- Test with screen readers when possible

### Performance

- Avoid unnecessary re-renders
- Clean up subscriptions and timers
- Optimize bundle size
- Use lazy loading appropriately

## Release Process

Releases are managed by maintainers:

1. Update version in `package.json`
2. Update CHANGELOG.md with version and date
3. Create git tag
4. Push to GitHub
5. Publish to npm
6. Create GitHub release

For contributors: You don't need to worry about versioning - maintainers handle this during the release process.

## Questions?

- **Issues**: Open an issue on GitHub for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Security**: See SECURITY.md for reporting security vulnerabilities

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to react-lzy-img! 🎉
