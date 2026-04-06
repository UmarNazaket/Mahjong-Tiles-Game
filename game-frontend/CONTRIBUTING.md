# Contributing to Angular Structure

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Install** dependencies with `npm install`
4. **Create** a feature branch

## 📋 Development Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user profile avatar upload
fix: resolve token refresh race condition
docs: update API integration guide
refactor: simplify auth interceptor logic
```

## 🧪 Before Submitting

- [ ] Code builds without errors (`npm run build`)
- [ ] No lint warnings
- [ ] New features have documentation
- [ ] Commit messages follow conventions

## 📁 Project Structure

When adding new features:

- **Components** → `src/app/features/[feature]/components/`
- **Services** → `src/app/features/[feature]/services/`
- **Shared Components** → `src/app/shared/components/`
- **Core Services** → `src/app/core/services/`

## 🎨 Code Style

- Use standalone components
- Follow Angular Style Guide
- Use `inject()` for dependency injection
- Use signals for reactive state

## 📝 Pull Request Process

1. Update README.md if needed
2. Fill out the PR template
3. Request review from maintainers
4. Address review feedback

## 💬 Questions?

Open an issue for questions or discussions.
