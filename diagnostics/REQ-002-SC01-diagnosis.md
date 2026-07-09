Failure Diagnosis: Admin create room

Scenario

Scenario ID: REQ-002-SC01
Test file: tests/example/adminRoomsCreate.test.ts
Failing step: the first step that touches `AdminRoomsPageLocators.CREATE_BUTTON`, most likely `verifyRoomManagementVisible()` or `createRoom()` depending on the exact stack trace in the missing log

Evidence Reviewed

Error message: not available in the pasted prompt; the supplied placeholder did not include the raw failure log or stack trace
Stack trace entry point: not available from the supplied log
Screenshot: not provided
Trace: not provided
Live application check via MCP: after logging in at `https://automationintesting.online/admin/rooms`, the page title was `Restful-booker-platform demo` and the real submit control rendered as `<button class="btn btn-outline-primary" id="createRoom" type="submit">Create</button>`. The current locator `[data-testid="deliberately-broken-create-room"]` matched zero elements, while `button` text `Create` was present and visible.

Classification
AUTOMATION_LOCATOR_FAILURE

Root Cause
The rooms page create-button locator is wrong in `src/support/locators/AdminRoomsPageLocators.ts:3`. It currently points to a deliberately broken test id:

```ts
static readonly CREATE_BUTTON = '[data-testid="deliberately-broken-create-room"]';
```

The live DOM shows the actual control uses `id="createRoom"`, so every action and assertion that depends on `CREATE_BUTTON` is targeting a selector that cannot match the application.

Shared-Impact Check
This same locator is reused in multiple places in `src/pages/adminRoomsPage.ts`: `pageReadySelector` at line 19, `verifyRoomManagementVisible()` at lines 31-35, `createRoom()` at lines 116-125, and `verifyCreateRoomFailureForInvalidPrice()` at lines 237-246. That means the single bad selector can explain multiple failures across the room-create flow.

Proposed Correction

File(s) to change: `src/support/locators/AdminRoomsPageLocators.ts`
Nature of change: update one locator string
Proposed new value/code:

```ts
static readonly CREATE_BUTTON = '#createRoom';
```

Confidence: high. The live DOM check via MCP directly confirmed the button’s real `id` and showed zero matches for the current selector, so the defect is in automation rather than the application.

Explicitly NOT Recommended

Assertion changes: none
Arbitrary waits/retries: none
Changes to unrelated files: none

Human Decision Required
This is a proposal only. The diagnosis file has been written; no production code was changed.
