# ts-pw-ui-framework_AI

![Playwright](https://img.shields.io/badge/Playwright-1.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Agentic QE](https://img.shields.io/badge/Agentic%20QE-Planner%20%7C%20Generator%20%7C%20Healer-purple)
![Playwright MCP](https://img.shields.io/badge/Playwright%20MCP-Browser%20Evidence-green)
![License](https://img.shields.io/badge/license-MIT-green)

A Playwright + TypeScript Quality Engineering framework extended with a practical, evidence-driven Agentic QE workflow using Codex and Playwright MCP.

This repository is the implementation platform for:

**The Complete Agentic AI for Quality Engineering Series: From Playwright Framework Architect to Agentic QE Architect**

The project started as a production-style Playwright automation framework. It now demonstrates a controlled end-to-end agent-assisted quality engineering workflow in which AI agents can:

* read software requirements
* explore a real application through Playwright MCP
* produce evidence-based test plans
* distinguish verified behavior from assumptions and unsupported functionality
* wait for explicit human QA approval
* generate tests that follow the existing framework architecture
* execute generated Playwright tests
* investigate real failures
* classify likely root causes
* propose the smallest safe correction without automatically modifying production test code

The goal is not to replace deterministic test automation with AI. The goal is to combine:

> **AI for reasoning and investigation. Playwright for deterministic execution. Human review for control and accountability.**

---

## What Has Been Built

The repository currently contains a working Milestone 1 Agentic QE loop:

```text
Requirement
    ↓
Planner Agent
    ├── Reads acceptance criteria
    ├── Explores the real application through Playwright MCP
    ├── Collects observable browser evidence
    └── Classifies every scenario
    ↓
Evidence-Based Test Plan
    ├── VERIFIED
    ├── ASSUMPTION_REQUIRES_REVIEW
    └── REJECTED_UNSUPPORTED
    ↓
Human QA Review
    ├── Reviews Planner evidence
    ├── Approves valid scenarios
    └── Prevents unsupported scenarios from reaching automation
    ↓
Generator Agent
    ├── Reads only approved scenarios
    ├── Inspects the existing framework architecture
    ├── Reuses Page Objects, fixtures, helpers, models, and locators
    ├── Adds only missing framework capabilities
    └── Generates maintainable Playwright tests
    ↓
Playwright Execution
    ├── Type checking
    ├── Lint validation
    ├── Real browser execution
    └── Failure artifacts
    ↓
Healer Agent
    ├── Inspects failure evidence
    ├── Inspects the relevant automation code
    ├── Uses Playwright MCP to compare automation against the live application
    ├── Classifies the likely root cause
    ├── Checks shared impact
    └── Proposes the smallest safe correction
    ↓
Human Decision
```

Milestone 1 deliberately stops at human review.

The Healer diagnoses and proposes corrections. It does not automatically patch framework code.

There is currently no autonomous orchestrator, automatic self-healing loop, LangGraph workflow, or unattended code modification. Those capabilities belong to later milestones.

---

## Why This Repository Exists

The goal of this project is not only to run UI tests.

It is a hands-on implementation platform for learning how Quality Engineering can evolve in layers:

1. Start with a production-style Playwright + TypeScript automation framework.
2. Understand the architecture decisions that keep automation maintainable.
3. Extend the framework with real application workflows.
4. Give AI agents controlled access to the real application through Playwright MCP.
5. Use application evidence rather than assumptions to plan test coverage.
6. Introduce explicit human approval before automation generation.
7. Generate tests that respect the existing framework instead of creating generic standalone scripts.
8. Investigate failures using execution evidence, code context, and live application state.
9. Progress from framework consumer to framework architect and ultimately toward Agentic QE architecture.

This repository is intentionally evolutionary.

The Playwright framework remains the deterministic execution engine. Agentic capabilities are added around it without replacing the framework's existing architecture.

---

## Core Design Principle

The project separates responsibilities deliberately:

```text
Requirements       → Define intended behavior
Planner Agent      → Investigates and classifies
Playwright MCP     → Provides live browser access and application evidence
Human QA Reviewer  → Decides what is approved for automation
Generator Agent    → Produces framework-compliant automation
Playwright         → Executes deterministic tests
Healer Agent       → Investigates failures and proposes corrections
Human Reviewer     → Decides whether a proposed correction should be applied
```

This prevents a common failure mode in AI-generated testing:

```text
Requirement
    ↓
AI assumes behavior
    ↓
AI generates code
    ↓
Test fails
    ↓
AI changes assertions until test passes
```

Instead, this project uses evidence and explicit boundaries:

```text
Requirement
    ↓
Real application exploration
    ↓
Evidence-based classification
    ↓
Human approval
    ↓
Framework-aware generation
    ↓
Deterministic execution
    ↓
Evidence-based diagnosis
    ↓
Human decision
```

---

## Agentic QE Workflow

### 1. Requirement

The workflow begins with a written requirement under:

```text
requirements/
```

Current implementation:

```text
requirements/REQ-002-admin-create-room.md
```

The requirement describes the Admin Create Room capability and contains acceptance criteria covering:

* creating a room with required fields
* supported room types
* accessibility options
* optional room features
* room-list verification after creation
* invalid-price behavior
* CSV bulk room creation

The CSV capability is deliberately included as an unsupported criterion to test hallucination control.

---

### 2. Planner Agent

The Planner transforms a requirement into an evidence-based test plan.

Its responsibility is not to generate automation.

The Planner:

1. Reads the specified requirement.
2. Extracts every acceptance criterion.
3. Uses Playwright MCP to explore the real application.
4. Performs relevant browser interactions where necessary.
5. Records concrete observable evidence.
6. Classifies every scenario using exactly one of:

```text
VERIFIED
ASSUMPTION_REQUIRES_REVIEW
REJECTED_UNSUPPORTED
```

A scenario cannot be classified as `VERIFIED` based only on the requirement document.

Observable application evidence is required.

Examples of acceptable evidence include:

* accessible role and name
* visible controls
* supported combobox options
* observed validation messages
* URL changes
* created records appearing in the application
* before-and-after application state

The Planner must not invent:

* field names
* button labels
* validation messages
* supported application behavior
* selectors
* application capabilities

---

### 3. Hallucination-Control Experiment

`REQ-002` deliberately contains this acceptance criterion:

> Newly created rooms can also be created in bulk by uploading a CSV file containing room details.

The Planner did not assume that this capability existed simply because it appeared in the requirement.

Instead, it inspected the Admin Rooms page and searched for evidence of:

* CSV controls
* upload controls
* bulk creation actions
* import functionality
* file inputs

No supporting evidence was found.

The scenario was therefore classified as:

```text
REJECTED_UNSUPPORTED
```

and was not approved for automation.

This demonstrates one of the central ideas of the project:

> **Requirements describe intended behavior. Application evidence determines what has actually been observed.**

---

### 4. Evidence-Based Test Plan

The Planner generated:

```text
specs/REQ-002-test-plan.md
```

The test plan records:

* source requirement
* application explored
* exploration evidence
* scenario classifications
* unsupported capabilities
* limitations and observations

For `REQ-002`, the Planner produced:

| Scenario                             | Classification         |
| ------------------------------------ | ---------------------- |
| Create room with required fields     | `VERIFIED`             |
| Select supported room type           | `VERIFIED`             |
| Mark room accessible or inaccessible | `VERIFIED`             |
| Select optional room features        | `VERIFIED`             |
| Created room appears in room list    | `VERIFIED`             |
| Reject empty and non-numeric prices  | `VERIFIED`             |
| Bulk-create rooms using CSV upload   | `REJECTED_UNSUPPORTED` |

---

### 5. Human QA Review

Classification does not equal approval.

The Planner can determine whether application evidence supports a scenario, but it cannot authorize its own scenarios for automation.

The test plan therefore includes a human QA review gate.

The Generator proceeds only when:

```text
Review Status: APPROVED_FOR_GENERATION
```

It may generate automation only for scenarios explicitly listed under:

```text
Approved for Automation
```

It must never generate automation for scenarios classified as:

```text
ASSUMPTION_REQUIRES_REVIEW
REJECTED_UNSUPPORTED
```

This creates an explicit separation:

```text
Planner Classification
        ≠
Human Approval
        ≠
Generator Authorization
```

---

### 6. Generator Agent

The Generator converts approved test-plan scenarios into Playwright automation.

Its primary challenge is not simply writing Playwright code.

It must generate code that fits the existing framework architecture.

Before making changes, the Generator inspects:

```text
src/pages/adminRoomsPage.ts
src/pages/adminLoginPage.ts
src/pages/base/BasePage.ts
src/support/locators/AdminRoomsPageLocators.ts
tests/example/adminPage.test.ts
```

It must reuse existing framework capabilities wherever possible, including:

```text
AdminLoginPage.loginAsAdmin()
StepRunner.run(...)
this.actions
this.ui
this.waitUtils
this.expectUtils
this.assertUtils
```

The Generator follows these constraints:

* reuse existing locators instead of duplicating them
* reuse existing Page Object methods where behavior already exists
* add new locators only to the locator layer
* add new UI behavior only to the appropriate Page Object
* never place reusable selectors inline in tests
* never generate automation for unapproved scenarios
* never modify requirements or Planner artifacts
* make only the minimum necessary change

---

### 7. Generated Test Coverage

The Generator created Playwright coverage for the approved `REQ-002` scenarios.

The generated tests cover:

* room creation with required fields
* supported room types
* accessible and inaccessible rooms
* optional feature selections
* verification of newly created rooms in the room list
* empty and non-numeric room-price failures

Generated tests preserve traceability through reporting metadata:

```ts
issues: [{ id: "REQ-002" }],
tmsLinks: [{ id: "REQ-002-SC01" }],
```

This creates the traceability chain:

```text
REQ-002
    ↓
REQ-002-SC01
    ↓
Human Approval
    ↓
Generated Playwright Test
    ↓
Execution Result
    ↓
Failure Diagnosis
```

The unsupported CSV scenario was not automated.

---

### 8. Framework-Aware Generation

The Generator extended the existing framework rather than bypassing it.

The implementation uses:

* `AdminLoginPage` for authentication
* `AdminRoomsPage` for room-management behavior
* `AdminRoomsPageLocators` for selectors
* `AdminRoomDetails` for typed room data
* reusable test-data utilities
* `UiFixture` for dependency injection
* `AllureReporter` for traceability and metadata
* existing enums for reporting ownership and categorization

This is an important project requirement.

The purpose of the Generator is not to create isolated Playwright scripts. It must behave like a contributor working inside an existing engineering system.

---

### 9. Deliberate Failure Experiment

After successful generation and execution, a controlled automation defect was introduced.

The working Create Room button locator was deliberately replaced with:

```ts
static readonly CREATE_BUTTON =
  '[data-testid="deliberately-broken-create-room"]';
```

The affected test was then executed to produce a real failure.

This gave the Healer a known failure where the true root cause was already understood by the human operator.

The Healer was not told the answer.

---

### 10. Healer Agent

The Healer is diagnosis-only in Milestone 1.

It does not automatically modify framework code.

The Healer investigates:

* failing scenario identity
* relevant test source
* Page Object implementation
* locator definitions
* available error evidence
* stack traces where available
* screenshots and traces where available
* current live application state through Playwright MCP

For the controlled locator failure, the Healer independently discovered:

```text
Current automation locator:
[data-testid="deliberately-broken-create-room"]

Live application DOM:
<button id="createRoom" type="submit">Create</button>

Current locator matches:
0 elements

Classification:
AUTOMATION_LOCATOR_FAILURE

Proposed minimum correction:
static readonly CREATE_BUTTON = '#createRoom';
```

The Healer also performed a shared-impact check and identified that the same locator was reused by multiple room-management operations.

It explicitly recommended:

```text
Assertion changes: none
Arbitrary waits/retries: none
Changes to unrelated files: none
Automatic production-code changes: none
```

The final decision remained with the human reviewer.

---

## Current Agentic QE Capabilities

| Capability                                          | Status                    |
| --------------------------------------------------- | ------------------------- |
| Requirement-driven planning                         | Implemented               |
| Live application exploration through Playwright MCP | Implemented               |
| Evidence-based scenario classification              | Implemented               |
| Hallucination control                               | Implemented               |
| Human approval gate                                 | Implemented               |
| Framework-aware test generation                     | Implemented               |
| Requirement-to-test traceability                    | Implemented               |
| Deterministic Playwright execution                  | Implemented               |
| Failure evidence collection                         | Implemented by framework  |
| Live failure investigation through MCP              | Implemented               |
| Failure classification                              | Implemented               |
| Shared-impact analysis                              | Implemented               |
| Minimum safe correction proposal                    | Implemented               |
| Automatic healing                                   | Not implemented by design |
| Agent orchestration                                 | Future milestone          |
| Typed agent artifact contracts                      | Future milestone          |
| Autonomous pipeline runner                          | Future milestone          |

---

## Current Application Under Test

The framework currently uses the Restful Booker Platform as the reference application:

* UI: `https://automationintesting.online`
* Admin area: `https://automationintesting.online/admin`

Credentials should be provided through environment configuration.

Do not commit real credentials or secrets to the repository.

---

## Framework Architecture

The Playwright framework remains the execution foundation for all agentic experiments.

The intended usage model is:

* tests orchestrate workflows
* fixtures inject typed dependencies
* page objects own UI behavior
* locator classes own reusable selectors
* helper classes own low-level browser mechanics
* models provide typed business data
* test-data utilities provide controlled runtime data
* database utilities own direct database access
* reporting hooks capture execution evidence automatically
* agents reason over requirements, application evidence, framework context, and execution failures

For day-to-day UI testing, import `test` or `uiTest` from:

```ts
@fixtures/UiFixture
```

---

## Repository Structure

```text
ts-pw-ui-framework_AI/
├── docs/
│   └── framework-architecture.md
│
├── requirements/
│   └── REQ-002-admin-create-room.md
│
├── specs/
│   └── REQ-002-test-plan.md
│
├── src/
│   ├── config/
│   ├── fixtures/
│   ├── helper/
│   ├── models/
│   ├── pages/
│   ├── support/
│   │   ├── locators/
│   │   └── test-data/
│   └── utils/
│
├── tests/
│   └── example/
│       ├── adminPage.test.ts
│       └── adminRoomsCreate.test.ts
│
├── eslint.config.mjs
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

The exact Codex agent instructions and local MCP configuration may be environment-specific and should be documented separately from the framework's portable business and test artifacts.

---

## Read This First

For the full framework design, usage model, extension guidance, and layer-by-layer explanation, read:

* [Framework Handbook](docs/framework-architecture.md)

Use this `README.md` for:

* project purpose
* Agentic QE workflow
* setup
* daily commands
* current capabilities
* repository navigation

---

## Prerequisites

* Node.js 18+
* npm
* Playwright browser binaries
* Java runtime if Allure report generation is required
* an MCP-compatible AI coding environment for agentic browser exploration
* Playwright MCP configured for Planner and Healer browser access
* MSSQL connection details only when database utilities are used

---

## Installation

```bash
git clone https://github.com/rajeshyemul/ts-pw-ui-framework_AI.git
cd ts-pw-ui-framework_AI
npm install
npx playwright install
```

---

## Environment Configuration

The framework is configured through environment variables or a local `.env` file.

Common values:

```text
ENVIRONMENT=dev|qa|stage|prod|local
BROWSER=chromium|firefox|webkit
HEADLESS=true|false
RETRIES=0|1|2
WORKERS=1|2|...
TEST_TIMEOUT=60000
UI_BASE_URL=https://automationintesting.online
ADMIN_USERNAME=<admin-username>
ADMIN_PASSWORD=<admin-password>
LOG_LEVEL=debug|info|warn|error
CI=true|false
```

Database values:

```text
DB_SERVER
DB_PORT
DB_NAME
DB_USERNAME
DB_PASSWORD
ENVIRONMENT_SUFFIX
```

Never commit secrets or environment-specific credentials to source control.

---

## Main Commands

```bash
# Full run
npm test

# Run UI suites
npm run test:ui

# Run smoke tests
npm run test:smoke

# Run integration-tagged tests
npm run test:integration

# Run in headed mode
npm run test:headed

# Run in debug mode
npm run test:debug

# Type-check the repository
npm run type-check

# Lint the repository
npm run lint

# Run the standard quality gate
npm run validate

# Format the repository
npm run format

# Generate HTML report
npm run report:html

# Generate and open Allure report
npm run report:allure
```

---

## Writing Tests

```ts
import { test } from "@fixtures/UiFixture";
import { HomePage } from "@pages/homePage";

test("loads the public room catalog @smoke", async ({ actions }) => {
  const homePage = new HomePage(actions);

  await homePage.navigate();
  await homePage.verifyPageLoaded();
  await homePage.verifyRoomCatalogVisible();
});
```

The UI fixture provides:

* `actions`
* `assertUtils`
* `expectUtils`

Tests create only the Page Objects they need. This keeps the base fixture lightweight even as the framework grows.

For database-enabled tests:

```ts
import { test } from "@fixtures/DBFixture";

test("verifies database state", async ({ db }) => {
  const result = await db.executeMSSQLQuery(
    "SELECT TOP 1 * FROM ExampleTable",
  );
});
```

---

## Runtime Flow

For deterministic Playwright execution:

1. `playwright.config.ts` loads browser, timeout, reporter, and artifact settings.
2. Global setup logs the start of the framework run.
3. Tests import the UI fixture.
4. Fixtures create `PageActions` and assertion helpers.
5. Tests instantiate the Page Objects they require.
6. Page Objects use helper classes for browser interactions and assertions.
7. `PageSetup.ts` captures failure evidence such as screenshots, page source, URL, title, and video according to framework configuration.
8. Reports are written to timestamped folders under `reports/`.
9. Global teardown logs the end of the framework run.

For the Agentic QE workflow:

1. A requirement is written.
2. The Planner explores the live application through Playwright MCP.
3. The Planner produces a classified, evidence-based test plan.
4. A human QA reviewer explicitly approves scenarios.
5. The Generator reads only approved scenarios.
6. The Generator extends the existing framework and creates Playwright tests.
7. The generated implementation passes the repository quality gate.
8. Playwright executes tests deterministically.
9. On failure, execution evidence becomes input to the Healer.
10. The Healer investigates code, evidence, and the live application.
11. The Healer proposes the smallest safe correction.
12. A human decides whether the proposed change should be applied.

---

## Extending the Framework

When adding new business coverage:

* add Page Objects under `src/pages`
* keep selectors under `src/support/locators`
* add typed business models under the appropriate models directory
* keep reusable test data under `src/support/test-data`
* add reusable actions or waits under `src/helper`
* use database utilities under `src/utils/database` only when direct database validation is required
* use `@fixtures/DBFixture` when a test needs database connection lifecycle management
* instantiate Page Objects in tests or create feature-specific fixtures only when repeated setup justifies them
* keep tests focused on workflows, not low-level browser mechanics

When extending agentic capabilities:

* keep requirements separate from generated plans
* require observable evidence for verified scenarios
* preserve human approval before generation
* preserve scenario traceability
* prevent unsupported functionality from reaching automation
* keep generation framework-aware
* prefer minimum safe corrections during failure diagnosis
* never weaken assertions merely to make a failing test pass

---

## Milestone 1 Status

Milestone 1 is complete.

```text
Step 1  Configure Codex + Playwright MCP           COMPLETE
Step 2  Create REQ-002 requirement                 COMPLETE
Step 3  Planner explores real application          COMPLETE
Step 4  Evidence-based test plan generated         COMPLETE
Step 5  Human QA review                            COMPLETE
Step 6  Generator creates framework-aware tests    COMPLETE
Step 7  Controlled failure and execution           COMPLETE
Step 8  Healer diagnosis and safe-fix proposal     COMPLETE
```

The result is one proven vertical slice:

```text
Requirement
    ↓
Evidence
    ↓
Classification
    ↓
Human Approval
    ↓
Generation
    ↓
Execution
    ↓
Failure
    ↓
Diagnosis
    ↓
Human Decision
```

---

## What Comes Next

Future milestones can evolve this implementation toward a more formal Agentic QE platform.

Potential next steps include:

* typed artifact contracts for requirements, scenarios, execution results, and diagnoses
* explicit agent execution contracts
* evidence packages for failed tests
* controlled pipeline runners
* agent-to-agent handoff through structured artifacts
* persistent run context
* approval workflows
* automatic but governed correction application
* CI/CD integration
* GitHub Issue and pull-request traceability
* orchestration across Planner, Generator, Executor, and Healer capabilities

The next goal is not simply to add more agents.

The goal is to turn the proven manual agent workflow into a controlled engineering system with explicit contracts, traceable artifacts, deterministic execution, and human-governed autonomy.

---

## Series Usage

This framework supports practical articles and implementation exercises in **The Complete Agentic AI for Quality Engineering Series**, including:

* Playwright framework architecture
* Page Object Model and fixture design
* reusable action, wait, assertion, and reporting layers
* configuration and environment management
* database validation patterns
* test evidence and reporting strategy
* prompt engineering for QE
* skills and progressive disclosure
* agent design
* Playwright MCP integration
* evidence-based test planning
* hallucination control
* framework-aware test generation
* AI-assisted failure diagnosis
* human approval gates
* future multi-agent orchestration and Agentic QE platform architecture

---

## Repository

* GitHub: `rajeshyemul/ts-pw-ui-framework_AI`
* Author: Rajesh Yemul
* License: MIT
