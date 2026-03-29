---
description: "Use when editing React components in TSX/JSX files in this slideshow project. Enforces React + TypeScript standards and safe refactor constraints."
applyTo: "**/*.{tsx,jsx}"
---
# React + TypeScript Standards

## Component Template

```tsx
export const NewFile = () => {
  return (
    <div>
    </div>
  )
}
```

## Core Principles

- Write lean, readable code that is easy to understand quickly.
- Keep logic straightforward and avoid clever abstractions.
- Keep functions focused on one task.
- Use descriptive names for files, functions, and variables.

## TypeScript Rules

- Do not use `any`.
- Keep types and interfaces explicit and minimal.

## React Rules

- Do not import React in component files.
- Do not use inline styles.
- Do not use nested function declarations.

## Refactor Rules

- If a file grows beyond 200-300 lines, ask before splitting it.
- If touched code violates these standards, refactor it without changing behavior.

## Comments

- Keep comments minimal.
- If needed for complex logic, write concise ALL CAPS comments.
