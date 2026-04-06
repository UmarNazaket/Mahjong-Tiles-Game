# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-19

### Added
- Initial Angular 21.1.0 project setup with zoneless change detection
- Standalone component architecture (no NgModules)
- NgRx SignalStore for state management (Auth, User stores)
- JWT authentication with automatic token refresh
- Route guards: AuthGuard, NoAuthGuard, RoleGuard
- HTTP interceptors: Auth, Error, Loading
- App initializer for loading auth state on startup
- Selective preloading strategy for lazy routes

### Features
- **Auth Module**: Login, Register, Forgot Password, Reset Password
- **User Management Module**: Profile, Profile Edit, Preferences
- **Dashboard**: Stats grid, quick actions, activity feed
- **Main Layout**: Responsive sidebar navigation

### Shared Components
- Loading Spinner with overlay
- Form Errors display component
- Notification Toast with animations
- Confirm Dialog modal
- Truncate and TimeAgo pipes
- AutoFocus directive
- Password validators

### Security
- JWT token injection via interceptor
- Automatic token refresh on 401 errors
- Request queuing during token refresh
- Secure token storage with environment config
