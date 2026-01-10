# Contributing to react-lzy-img

Thank you for considering contributing to react-lzy-img! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful and inclusive. We welcome contributions from everyone.

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm 9+

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-lzy-img.git
   cd react-lzy-img
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Building

```bash
npm run build
```

### Running All Checks

```bash
npm run typecheck && npm run lint && npm test -- --run && npm run build
```

## Making Changes

### Code Style

- Use TypeScript for all code
- Follow existing code style (enforced by ESLint)
- Write meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### Testing

- Write tests for all new features
- Ensure existing tests pass
- Aim for high test coverage (70%+)
- Test edge cases and error conditions
- Use descriptive test names

Example test structure:
```typescript
describe('Feature', () => {
  it('should do something specific', () => {
    // Arrange
    const props = { ... };
    
    // Act
    const { container } = render(<Component {...props} />);
    
    // Assert
    expect(container).toBeTruthy();
  });
});
```

### Commit Messages

Follow conventional commits format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Adding or updating tests
- `chore:` Maintenance tasks
- `refactor:` Code refactoring
- `perf:` Performance improvements

Examples:
```
feat: add support for webp format detection
fix: resolve memory leak in canvas cleanup
docs: update browser compatibility table
test: add tests for prefers-reduced-motion
```

## Pull Request Process

1. **Update documentation**: If you add/change features, update README.md
2. **Add tests**: Ensure your changes are tested
3. **Update CHANGELOG**: Add your changes to the [Unreleased] section
4. **Run all checks**: Make sure typecheck, lint, tests, and build all pass
5. **Create PR**: Submit a pull request with a clear description
6. **Respond to feedback**: Address any review comments

### PR Checklist

- [ ] Tests added/updated and passing
- [ ] TypeScript types are correct
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] All CI checks pass
- [ ] Code is linted and formatted
- [ ] No breaking changes (or clearly documented)
- [ ] Bundle size impact is acceptable

## Release Process

Releases are automated via GitHub Actions when tags are pushed:

1. Update version in package.json
2. Update CHANGELOG.md
3. Commit changes: `git commit -m "chore: release v0.x.x"`
4. Create tag: `git tag v0.x.x`
5. Push: `git push && git push --tags`

The CI will automatically:
- Run tests
- Build the package
- Publish to npm
- Create GitHub release

## Questions or Issues?

- Open an issue for bugs or feature requests
- Email garrettsiegel@gmail.com for questions
- Check existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
