# Design Patterns Project Guide

## Build & Test Commands
- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run all tests
- `npm test -- --watch` - Run tests in watch mode
- `npm test -- -t "testName"` - Run specific test by name pattern
- `npm test -- path/to/test` - Run specific test file

## Code Style Guidelines
- Use functional components with hooks for React components
- Type all props, state, and function returns with TypeScript 
- Component file naming: `PascalCase.tsx` (e.g., `FacadeDemo.tsx`)
- Interface & type names: `PascalCase` (e.g., `ApiServiceInterface`)
- Variable & function names: `camelCase` (e.g., `handleVolumeChange`)
- Use TSDoc-style comments for classes and interfaces
- Prefer explicit return types on functions
- Use async/await for asynchronous code
- Place related functionality in separate directories
- Each pattern should be documented with a README.md file
- Include descriptive and educational comments for pattern implementations