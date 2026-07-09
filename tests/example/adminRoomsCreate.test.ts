import { test } from "@fixtures/UiFixture";
import { AllureReporter } from "@helper/reporting/AllureReporter";
import { AdminLoginPage } from "@pages/adminLoginPage";
import { AdminRoomsPage } from "@pages/adminRoomsPage";
import type { AdminRoomDetails } from "@models/AdminRoomsPageTypes";
import {
  createUniqueRoomName,
  SUPPORTED_ACCESSIBLE_OPTIONS,
  SUPPORTED_FEATURES,
  SUPPORTED_ROOM_TYPES,
} from "@support/test-data/AdminRoomsPageTestData";
import { Epic } from "@support/enums/allureReports/Epic";
import { TestOwners } from "@support/enums/allureReports/TestOwners";

test.describe("Admin create room", () => {
  let adminLoginPage: AdminLoginPage;
  let adminRoomsPage: AdminRoomsPage;

  test.beforeEach(async ({ actions }) => {
    adminLoginPage = new AdminLoginPage(actions);
    adminRoomsPage = new AdminRoomsPage(actions);
  });

  test("creates a room with required fields @smoke", async () => {
    await AllureReporter.attachDetails({
      epic: Epic.UI_TESTING,
      feature: "Admin room management",
      story: "Admin can create a room with required fields",
      severity: "critical",
      owner: TestOwners.USER_01,
      component: "Admin rooms page",
      tags: ["smoke", "ui", "admin", "REQ-002"],
      issues: [{ id: "REQ-002" }],
      tmsLinks: [{ id: "REQ-002-SC01" }],
      description:
        "Verifies that an authenticated admin can create a room with room name, type, and price.",
    });

    const room: AdminRoomDetails = {
      roomName: createUniqueRoomName("REQ-002-SC01"),
      type: "Double",
      accessible: "false",
      price: "199",
    };

    await adminLoginPage.navigate();
    await adminLoginPage.loginAsAdmin();
    await adminRoomsPage.verifyPageLoaded();
    await adminRoomsPage.verifyRoomManagementVisible();
    await adminRoomsPage.createRoom(room);
    await adminRoomsPage.verifyRoomDetails(room);
  });

  test("uses the supported room type list when creating a room @smoke", async () => {
    await AllureReporter.attachDetails({
      epic: Epic.UI_TESTING,
      feature: "Admin room management",
      story: "Admin selects a supported room type",
      severity: "critical",
      owner: TestOwners.USER_01,
      component: "Admin rooms page",
      tags: ["smoke", "ui", "admin", "REQ-002"],
      issues: [{ id: "REQ-002" }],
      tmsLinks: [{ id: "REQ-002-SC02" }],
      description:
        "Verifies that room type is selected from the supported application list.",
    });

    const room: AdminRoomDetails = {
      roomName: createUniqueRoomName("REQ-002-SC02"),
      type: "Suite",
      accessible: "false",
      price: "225",
    };

    await adminLoginPage.navigate();
    await adminLoginPage.loginAsAdmin();
    await adminRoomsPage.verifyPageLoaded();
    await adminRoomsPage.verifyRoomTypeOptions(SUPPORTED_ROOM_TYPES);
    await adminRoomsPage.createRoom(room);
    await adminRoomsPage.verifyRoomDetails(room);
  });

  test("creates rooms with accessible true and false values @smoke", async () => {
    await AllureReporter.attachDetails({
      epic: Epic.UI_TESTING,
      feature: "Admin room management",
      story: "Admin marks a room as accessible or not accessible",
      severity: "critical",
      owner: TestOwners.USER_01,
      component: "Admin rooms page",
      tags: ["smoke", "ui", "admin", "REQ-002"],
      issues: [{ id: "REQ-002" }],
      tmsLinks: [{ id: "REQ-002-SC03" }],
      description:
        "Verifies that the accessible field supports true and false room values.",
    });

    const accessibleRoom: AdminRoomDetails = {
      roomName: createUniqueRoomName("REQ-002-SC03-TRUE"),
      type: "Twin",
      accessible: "true",
      price: "150",
    };
    const inaccessibleRoom: AdminRoomDetails = {
      roomName: createUniqueRoomName("REQ-002-SC03-FALSE"),
      type: "Single",
      accessible: "false",
      price: "100",
    };

    await adminLoginPage.navigate();
    await adminLoginPage.loginAsAdmin();
    await adminRoomsPage.verifyPageLoaded();
    await adminRoomsPage.verifyAccessibleOptions(SUPPORTED_ACCESSIBLE_OPTIONS);
    await adminRoomsPage.createRoom(accessibleRoom);
    await adminRoomsPage.verifyRoomDetails(accessibleRoom);
    await adminRoomsPage.createRoom(inaccessibleRoom);
    await adminRoomsPage.verifyRoomDetails(inaccessibleRoom);
  });

  test("creates a room with optional feature selections @smoke", async () => {
    await AllureReporter.attachDetails({
      epic: Epic.UI_TESTING,
      feature: "Admin room management",
      story: "Admin selects optional room features",
      severity: "critical",
      owner: TestOwners.USER_01,
      component: "Admin rooms page",
      tags: ["smoke", "ui", "admin", "REQ-002"],
      issues: [{ id: "REQ-002" }],
      tmsLinks: [{ id: "REQ-002-SC04" }],
      description:
        "Verifies that room features are optional selectable amenities on the create-room form.",
    });

    const room: AdminRoomDetails = {
      roomName: createUniqueRoomName("REQ-002-SC04"),
      type: "Double",
      accessible: "true",
      price: "175",
      features: ["WiFi", "Safe"],
    };

    await adminLoginPage.navigate();
    await adminLoginPage.loginAsAdmin();
    await adminRoomsPage.verifyPageLoaded();
    await adminRoomsPage.verifyFeatureOptionsVisible(SUPPORTED_FEATURES);
    await adminRoomsPage.createRoom(room);
    await adminRoomsPage.verifyRoomDetails(room);
  });

  test("shows a created room in the admin room list with entered details @smoke", async () => {
    await AllureReporter.attachDetails({
      epic: Epic.UI_TESTING,
      feature: "Admin room management",
      story: "Created room appears in the admin room list",
      severity: "critical",
      owner: TestOwners.USER_01,
      component: "Admin rooms page",
      tags: ["smoke", "ui", "admin", "REQ-002"],
      issues: [{ id: "REQ-002" }],
      tmsLinks: [{ id: "REQ-002-SC05" }],
      description:
        "Verifies that a successfully created room appears with the entered details in the admin room list.",
    });

    const room: AdminRoomDetails = {
      roomName: createUniqueRoomName("REQ-002-SC05"),
      type: "Family",
      accessible: "true",
      price: "250",
      features: ["Radio", "Views"],
    };

    await adminLoginPage.navigate();
    await adminLoginPage.loginAsAdmin();
    await adminRoomsPage.verifyPageLoaded();
    await adminRoomsPage.createRoom(room);
    await adminRoomsPage.verifyRoomDetails(room);
  });

  test("rejects empty and non-numeric room prices @smoke", async () => {
    await AllureReporter.attachDetails({
      epic: Epic.UI_TESTING,
      feature: "Admin room management",
      story: "Invalid room prices are rejected",
      severity: "critical",
      owner: TestOwners.USER_01,
      component: "Admin rooms page",
      tags: ["smoke", "ui", "admin", "REQ-002"],
      issues: [{ id: "REQ-002" }],
      tmsLinks: [{ id: "REQ-002-SC06" }],
      description:
        "Verifies that empty and non-numeric prices display a validation failure and do not create rooms.",
    });

    const emptyPriceRoom: AdminRoomDetails = {
      roomName: createUniqueRoomName("REQ-002-SC06-EMPTY"),
      type: "Single",
      accessible: "false",
      price: "",
    };
    const nonNumericPriceRoom: AdminRoomDetails = {
      roomName: createUniqueRoomName("REQ-002-SC06-NONNUMERIC"),
      type: "Single",
      accessible: "false",
      price: "abc",
    };

    await adminLoginPage.navigate();
    await adminLoginPage.loginAsAdmin();
    await adminRoomsPage.verifyPageLoaded();
    await adminRoomsPage.verifyCreateRoomFailureForInvalidPrice(emptyPriceRoom, "");
    await adminRoomsPage.verifyCreateRoomFailureForInvalidPrice(
      nonNumericPriceRoom,
      "abc",
    );
  });
});
