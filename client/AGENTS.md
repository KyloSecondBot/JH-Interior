# Repository Guidelines

## Project Structure & Module Organization
- Source code: `src/` (group by feature or domain).
- Tests: `tests/` (mirror `src/` structure; use `unit/`, `integration/` as needed).
- Static assets: `public/` or `assets/` (images, fonts, static JSON).
- Configuration: `config/` and environment files (see `.env.example`).
- Scripts & tooling: `scripts/` (repeatable dev/build helpers).

Example:
```
src/ feature-a/ component.tsx
tests/ feature-a/ component.test.tsx
assets/ images/
scripts/ ci-build.ps1
```

## Build, Test, and Development Commands
- Install deps: `npm ci` (Node), `pip install -r requirements.txt` (Python), or `dotnet restore` (.NET).
- Run locally: `npm run dev` | `python -m app` | `dotnet run`.
- Build artifacts: `npm run build` | `python -m build` | `dotnet build -c Release`.
- Run tests: `npm test` | `pytest -q` | `dotnet test`.
Prefer package manager scripts (e.g., `package.json` `scripts`) when available.

## Coding Style & Naming Conventions
- Indentation: 2 spaces (JS/TS), 4 spaces (Python/.NET).
- Files: `kebab-case` for files; tests end with `.test.*`.
- Code: `PascalCase` for types/classes, `camelCase` for variables/functions, `SCREAMING_SNAKE_CASE` for constants.
- Formatting & linting: Prettier/ESLint (JS/TS), Black/Ruff (Python), `dotnet format` (.NET). Run formatters before commits.

## Testing Guidelines
- Frameworks: Jest/Vitest (JS/TS), Pytest (Python), xUnit (.NET).
- Location/patterns: keep tests in `tests/` and/or `**/*.test.*` next to source.
- Coverage: target >= 80% lines/branches; include edge cases and failure paths.
- Quick run examples: `npm test -- --watch`, `pytest tests/ -k name`, `dotnet test --filter Category=Unit`.

## Commit & Pull Request Guidelines
- Commits: use Conventional Commits (e.g., `feat:`, `fix:`, `chore:`, `docs:`). Keep messages imperative and scoped.
- Branches: `type/short-description` (e.g., `feat/home-hero-layout`).
- PRs: include summary, rationale, screenshots (UI), steps to validate, linked issues, and any migration notes. Keep PRs small and focused.

## Security & Configuration Tips
- Never commit secrets. Use `.env` (local) and `.env.example` (document keys). Add `.env` to `.gitignore`.
- Prefer library-provided secret stores or CI secrets for deployments.
- Validate inputs and sanitize user-facing content to avoid injection issues.

## Agent-Specific Instructions
- Place automation in `scripts/` with clear names; make scripts idempotent and include a `--dry-run` option when possible.
- Do not change unrelated files. Keep diffs minimal and focused on the task.

