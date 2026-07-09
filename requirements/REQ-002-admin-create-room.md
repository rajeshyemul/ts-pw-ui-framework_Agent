# REQ-002: Admin — Create New Room

## Background

Admin users currently can view and verify existing rooms in the admin panel but cannot create new ones through the automated suite. This requirement covers adding a new room via the admin **Create room** panel.

## Acceptance Criteria

1. An authenticated admin can create a new room by providing a room name/number, room type, and nightly price.

2. The room type must be selected from the application's supported list of room types.

3. The admin can mark the room as accessible or not accessible.

4. The admin can optionally select one or more room features or amenities, such as:

   * WiFi
   * TV
   * Radio
   * Refreshments
   * Safe
   * Views

5. On successful creation, the new room appears in the admin room list with the details that were entered.

6. If the price field is left empty or contains a non-numeric value, the form displays a validation error and does not create the room.

7. Newly created rooms can also be created in bulk by uploading a CSV file containing room details, in addition to using the single-room creation form.

## Out of Scope

The following behaviours are explicitly outside the scope of this requirement:

* Editing existing rooms.
* Deleting existing rooms.
* Guest-facing booking flows for newly created rooms.

## Evidence Requirement

Before any scenario is approved for automation, the Planner must validate it against:

1. The acceptance criteria defined in this requirement.
2. The actual behaviour observed in the running application through Playwright MCP browser exploration.

Every proposed scenario must be classified as exactly one of:

* `VERIFIED`
* `ASSUMPTION_REQUIRES_REVIEW`
* `REJECTED_UNSUPPORTED`

A scenario must not be classified as `VERIFIED` based only on this requirement document. Observable application evidence is also required.

Unsupported functionality must not be automated.
