# ts-pw-ui-framework — Agent Instructions

## Application Under Test
- Admin panel: https://automationintesting.online/admin
- This is the Restful-Booker-Platform public demo app.

## Framework Conventions (must be respected by any generated or modified code)
- Page Objects live in `src/pages/` and extend the existing base page pattern.
- Locators live in `src/support/locators/`, one file per page — do not inline
  raw selectors inside page object methods or test files.
- Shared fixtures live in `src/fixtures/` (see `UiFixture.ts`).
- Custom ESLint rules enforce framework conventions and MUST pass before any
  generated code is considered done:
  - no-duplicate-tags
  - prevent-duplicate-titles
  - no-internal-action-imports
  - no-unused-constants
  Run `npm run validate` after any change and fix all violations.
- Tests use `@smoke` and related tags per existing convention in `tests/`.
- Before creating any new Page Object method, locator, or fixture, search the
  existing codebase for one that already does this. Reuse it. Never create a
  duplicate of existing functionality.
  - Shared TypeScript types/interfaces used across a page's tests and page
  objects belong in `src/support/models/<Page>PageTypes.ts` — one file per
  page, matching the naming pattern already used for
  `src/support/locators/<Page>PageLocators.ts`. Do not define shared types
  inline inside a page object or test file.
- Shared test data (fixed value sets, ID/data generators, sample payloads)
  belongs in `src/support/test-data/<Page>PageTestData.ts` — one file per
  page, same naming pattern. Do not inline test-data constants or generator
  functions directly inside a test file.
- Before generating a test or page object, always check
  `src/support/models/` and `src/support/test-data/` for an existing file
  matching this page, even if the folder currently looks sparsely populated
  — an empty-looking folder does not mean the convention doesn't apply.
- Import shared page types from `@models/<Page>PageTypes` and shared test data
  from `@support/test-data/<Page>PageTestData` rather than exporting them from
  page objects or defining them inline in tests.

## Roles
This repo uses role-specific instruction files under `.codex/roles/`. When
asked to act as a specific role (Planner, Generator, Healer), read the
corresponding file in that directory and follow it exactly for the session.
Do not blend responsibilities across roles unless explicitly told to.
