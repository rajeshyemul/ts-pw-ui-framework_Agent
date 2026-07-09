Test Plan: REQ-002 — Admin — Create New Room

Source

Requirement: requirements/REQ-002-admin-create-room.md
Application explored: https://automationintesting.online/admin
Exploration date: 2026-07-09

Scenarios

Scenario 1: Create room with required fields

Source criterion: #1 — "An authenticated admin can create a new room by providing a room name/number, room type, and nightly price."
Classification: VERIFIED
Evidence: Logged in from `https://automationintesting.online/admin` using textbox "Username", textbox "Password", and button "Login"; observed URL `https://automationintesting.online/admin/rooms`. In the rooms form, filled textbox `roomName` with `902`, selected combobox `#type` option "Double", filled textbox `#roomPrice` with `199`, clicked button "Create", and observed a new room-list row with paragraph values "902", "Double", "true", "199", and "WiFi, Safe".
Notes: The room name/number and price textboxes are exposed without accessible names in the snapshot, but Playwright identified implementation ids/test ids during interaction: `roomName` and `roomPrice`.

Scenario 2: Select supported room type

Source criterion: #2 — "The room type must be selected from the application's supported list of room types."
Classification: VERIFIED
Evidence: The room creation form exposed a combobox with options "Single", "Twin", "Double", "Family", and "Suite". Selecting "Double" for room `902` created a room-list row with paragraph "Double"; selecting "Twin" for room `905` created a room-list row with paragraph "Twin".
Notes: No free-text room type control was observed; the room type control was a combobox.

Scenario 3: Mark room accessible or not accessible

Source criterion: #3 — "The admin can mark the room as accessible or not accessible."
Classification: VERIFIED
Evidence: The room creation form exposed an accessibility combobox with options "false" and "true". Selecting "true" for room `902` created a room-list row with paragraph "true"; selecting "false" for room `905` created a room-list row with paragraph "false".
Notes: The snapshot labels this as a generic combobox without an accessible name, but the observed options and resulting list values directly support the criterion.

Scenario 4: Select optional room features or amenities

Source criterion: #4 — "The admin can optionally select one or more room features or amenities, such as:

   * WiFi
   * TV
   * Radio
   * Refreshments
   * Safe
   * Views"
Classification: VERIFIED
Evidence: The room creation form exposed checkboxes named "WiFi", "TV", "Radio", "Refreshments", "Safe", and "Views". Selecting checkbox "WiFi" and checkbox "Safe" for room `902` created a room-list row with paragraph "WiFi, Safe". Creating room `905` without selecting feature checkboxes created a room-list row containing "No features added to the room".
Notes: The criterion says features are optional; both selected and unselected states were observed.

Scenario 5: Created room appears in admin room list

Source criterion: #5 — "On successful creation, the new room appears in the admin room list with the details that were entered."
Classification: VERIFIED
Evidence: After clicking button "Create" for room `902`, the admin room list included a new row with paragraph values "902", "Double", "true", "199", and "WiFi, Safe". After clicking button "Create" for room `905`, the admin room list included a new row with paragraph values "905", "Twin", "false", "111", and "No features added to the room".
Notes: The rooms page remained at `https://automationintesting.online/admin/rooms` after creation.

Scenario 6: Price validation prevents invalid creation

Source criterion: #6 — "If the price field is left empty or contains a non-numeric value, the form displays a validation error and does not create the room."
Classification: VERIFIED
Evidence: With room `903`, selected type "Single", selected accessible "false", left price textbox empty, clicked button "Create", and observed paragraph "Failed to create room"; no room-list row for "903" appeared. With room `904`, selected type "Single", selected accessible "false", filled price textbox with `abc`, clicked button "Create", and observed paragraph "Failed to create room"; no room-list row for "904" appeared.
Notes: The observed validation message is generic: "Failed to create room". No field-specific price validation text was observed.

Scenario 7: Bulk create rooms from CSV upload

Source criterion: #7 — "Newly created rooms can also be created in bulk by uploading a CSV file containing room details, in addition to using the single-room creation form."
Classification: REJECTED_UNSUPPORTED
Evidence: On `https://automationintesting.online/admin/rooms`, the accessibility snapshot showed navigation links "Rooms", "Report", "Branding", "Messages 2", the single-room creation form, and button "Create", but no upload, CSV, bulk, import, or file chooser control. A targeted DOM check on the same page returned `fileInputs: []`, `csvMentions: []`, and `buttonsAndLinks: []` for text or links matching `csv`, `upload`, `bulk`, or `import`.
Notes: Explored the relevant admin rooms page only; no evidence of CSV bulk creation was present there. Unsupported functionality should not be automated.

## Summary Table

| # | Criterion | Classification |
|---|-----------|----------------|
| 1 | An authenticated admin can create a new room by providing a room name/number, room type, and nightly price. | VERIFIED |
| 2 | The room type must be selected from the application's supported list of room types. | VERIFIED |
| 3 | The admin can mark the room as accessible or not accessible. | VERIFIED |
| 4 | The admin can optionally select one or more room features or amenities, such as WiFi, TV, Radio, Refreshments, Safe, Views. | VERIFIED |
| 5 | On successful creation, the new room appears in the admin room list with the details that were entered. | VERIFIED |
| 6 | If the price field is left empty or contains a non-numeric value, the form displays a validation error and does not create the room. | VERIFIED |
| 7 | Newly created rooms can also be created in bulk by uploading a CSV file containing room details, in addition to using the single-room creation form. | REJECTED_UNSUPPORTED |


## Human QA Review

**Reviewer Decision:** APPROVED_WITH_EXCLUSIONS

### Approved for Automation

- Scenario 1: Create room with required fields
- Scenario 2: Select supported room type
- Scenario 3: Mark room accessible or not accessible
- Scenario 4: Select optional room features or amenities
- Scenario 5: Created room appears in admin room list
- Scenario 6: Price validation prevents invalid creation

### Not Approved for Automation

- Scenario 7: Bulk create rooms from CSV upload
  - Reason: `REJECTED_UNSUPPORTED`

### Approval Rule

The Test Generator may generate automation only for scenarios explicitly listed under **Approved for Automation**.

The Test Generator must not generate automation for scenarios classified as:

- `ASSUMPTION_REQUIRES_REVIEW`
- `REJECTED_UNSUPPORTED`

**Review Status:** APPROVED_FOR_GENERATION