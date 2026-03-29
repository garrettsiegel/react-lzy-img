---
description: "Use when editing React or TypeScript files to run react-dr-cli diagnostics and fix findings. Covers health score checks, lint, dead code, architecture, security, and performance diagnostics."
applyTo: ["**/*.tsx", "**/*.ts", "**/*.jsx"]
---

# REACT-DR CHECK WORKFLOW

- Use `react-dr-cli` (never `react-doctor`) to validate React code quality after meaningful edits in matched files.
- Run from the repository root:
  - `npx -y react-dr-cli@1.0.0 . --verbose`
- Prefer diff mode for focused scans when a base branch exists:
  - `npx -y react-dr-cli@1.0.0 . --diff main --verbose`

# RESULT HANDLING

- Prioritize `error` diagnostics first, then `warning` diagnostics.
- Include the rule, file path, and a short fix rationale in your response.
- If diagnostics are intentionally ignored, document the reason and suggest a config suppression only when justified.
- Treat health score bands as:
  - `>= 75`: Great
  - `50-74`: Needs work
  - `< 50`: Critical

# CONFIGURATION

- Use `react-doctor.config.json` for persistent ignores.
- Keep ignores minimal and specific by rule or file glob.
