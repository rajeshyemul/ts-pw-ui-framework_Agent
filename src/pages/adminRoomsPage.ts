import { Locator } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { PageActions } from '@helper/actions/PageActions';
import { StepRunner } from '@helper/reporting/StepRunner';
import { ApplicationUrls } from '@support/constants/ApplicationUrls';
import { AdminRoomsPageLocators } from '@support/locators/AdminRoomsPageLocators';
import type {
  AdminRoomDetails,
  RoomAccessible,
  RoomFeature,
  RoomType,
} from '@models/AdminRoomsPageTypes';

const ALL_ROOM_FEATURES: RoomFeature[] = ['WiFi', 'TV', 'Radio', 'Refreshments', 'Safe', 'Views'];

export class AdminRoomsPage extends BasePage {
  protected pageUrl = ApplicationUrls.ADMIN_ROOMS;
  protected pageTitle = /Restful-booker-platform demo/i;
  protected pageReadySelector = AdminRoomsPageLocators.CREATE_BUTTON;

  constructor(pageActions: PageActions) {
    super(pageActions);
  }

  /**
   * Verifies that the room management page is visible and contains the expected elements.
   * @returns {Promise<void>} A promise that resolves when the verification is complete.
   */
  async verifyRoomManagementVisible(): Promise<void> {
    await StepRunner.run('Admin Rooms - verify room management page', async () => {
      await this.expectUtils.expectElementToBeVisible(
        AdminRoomsPageLocators.CREATE_BUTTON,
        'create room button',
        'Create room button is not visible'
      );
      await this.expectUtils.expectElementToBeVisible(
        AdminRoomsPageLocators.LOGOUT_BUTTON,
        'logout button',
        'Logout button is not visible'
      );
      await this.expectUtils.expectElementToBeVisible(
        AdminRoomsPageLocators.ROOM_NUMBER_LABEL,
        'room number heading',
        'Room number heading is not visible'
      );
      await this.expectUtils.expectElementToBeVisible(
        AdminRoomsPageLocators.ROOM_DETAILS_LABEL,
        'room details heading',
        'Room details heading is not visible'
      );
    });
  }

  /**
   * Verifies that a specific room is visible on the page.
   * @param {string} roomName - The name of the room to verify.
   * @returns {Promise<void>} A promise that resolves when the verification is complete.
   */
  async verifyRoomVisible(roomName: string): Promise<void> {
    await StepRunner.run(`Admin Rooms - verify room "${roomName}"`, async () => {
      await this.expectUtils.expectElementToBeVisible(
        this.locatorByText(roomName),
        `room row for ${roomName}`,
        `Room "${roomName}" is not visible in the admin room list`,
        { timeout: 15_000 }
      );
    });
  }

  /**
   * Verifies that the room inventory is populated with seeded data.
   * @returns {Promise<void>} A promise that resolves when the verification is complete.
   */
  async verifyRoomInventoryIsPopulated(): Promise<void> {
    await StepRunner.run('Admin Rooms - verify room inventory is populated', async () => {
      await this.expectUtils.expectElementToContainText(
        AdminRoomsPageLocators.BODY,
        'room inventory headers',
        /Room #|Type|Price/i,
        'Room inventory headers are not visible in the admin rooms page'
      );
      await this.expectUtils.expectElementToContainText(
        AdminRoomsPageLocators.BODY,
        'seeded room types',
        /Single|Double|Suite/i,
        'Expected seeded room types are not visible in the admin rooms page'
      );
    });
  }

  /**
   * Verifies that the expected room names are visible on the page.
   * @param {string[]} expectedRoomNames - An array of expected room names.
   * @returns {Promise<void>} A promise that resolves when the verification is complete.
   */
  async verifyRoomNamesVisible(expectedRoomNames: string[]): Promise<void> {
    await this.assertUtils.assertGreaterThan(
      expectedRoomNames.length,
      0,
      'Expected room names collection should not be empty'
    );

    // Verify each expected room name is visible on the page
    await StepRunner.run('Admin Rooms - verify expected room names', async () => {
      for (const roomName of expectedRoomNames) {
        await this.verifyRoomVisible(roomName);
      }
    });
  }

  /**
   * Creates a room using the admin single-room creation form.
   * @param {AdminRoomDetails} room - The room details to enter.
   * @returns {Promise<void>} A promise that resolves when the room is created and visible.
   */
  async createRoom(room: AdminRoomDetails): Promise<void> {
    await StepRunner.run(`Admin Rooms - create room "${room.roomName}"`, async () => {
      await this.fillRoomForm(room);
      await this.ui.element.click(AdminRoomsPageLocators.CREATE_BUTTON);
      await this.expectUtils.expectElementToBeVisible(
        this.getRoomRow(room.roomName),
        `created room row for ${room.roomName}`,
        `Room "${room.roomName}" was not visible after creation`,
        { timeout: 15_000 }
      );
    });
  }

  /**
   * Verifies that the room type dropdown exposes the supported room types.
   * @param {RoomType[]} expectedTypes - The expected supported room types.
   * @returns {Promise<void>} A promise that resolves when the options are verified.
   */
  async verifyRoomTypeOptions(expectedTypes: RoomType[]): Promise<void> {
    await StepRunner.run('Admin Rooms - verify room type options', async () => {
      await this.expectUtils.expectElementToHaveText(
        AdminRoomsPageLocators.ROOM_TYPE_OPTIONS,
        'room type options',
        expectedTypes,
        'Room type options did not match the supported list'
      );
    });
  }

  /**
   * Verifies that the accessible dropdown exposes both supported accessibility choices.
   * @param {RoomAccessible[]} expectedOptions - The expected accessibility options.
   * @returns {Promise<void>} A promise that resolves when the options are verified.
   */
  async verifyAccessibleOptions(expectedOptions: RoomAccessible[]): Promise<void> {
    await StepRunner.run('Admin Rooms - verify accessible options', async () => {
      await this.expectUtils.expectElementToHaveText(
        AdminRoomsPageLocators.ACCESSIBLE_OPTIONS,
        'accessible options',
        expectedOptions,
        'Accessible options did not match the supported list'
      );
    });
  }

  /**
   * Verifies that the expected room feature checkboxes are visible.
   * @param {RoomFeature[]} expectedFeatures - The expected room feature checkbox names.
   * @returns {Promise<void>} A promise that resolves when all feature controls are visible.
   */
  async verifyFeatureOptionsVisible(expectedFeatures: RoomFeature[]): Promise<void> {
    await StepRunner.run('Admin Rooms - verify feature options', async () => {
      for (const feature of expectedFeatures) {
        await this.expectUtils.expectElementToBeVisible(
          this.getFeatureCheckbox(feature),
          `${feature} feature checkbox`,
          `${feature} feature checkbox is not visible`
        );
      }
    });
  }

  /**
   * Verifies that a room row contains the expected details.
   * @param {AdminRoomDetails} room - The expected room details.
   * @returns {Promise<void>} A promise that resolves when the room details are verified.
   */
  async verifyRoomDetails(room: AdminRoomDetails): Promise<void> {
    await StepRunner.run(`Admin Rooms - verify room details for "${room.roomName}"`, async () => {
      const roomRow = this.getRoomRow(room.roomName);
      const featureText = this.getExpectedFeatureText(room.features);

      await this.expectUtils.expectElementToBeVisible(
        roomRow,
        `room row for ${room.roomName}`,
        `Room "${room.roomName}" is not visible in the admin room list`,
        { timeout: 15_000 }
      );
      await this.expectUtils.expectElementToContainText(
        roomRow,
        `${room.roomName} row room name`,
        room.roomName,
        `Room row did not contain room name "${room.roomName}"`
      );
      await this.expectUtils.expectElementToContainText(
        roomRow,
        `${room.roomName} row type`,
        room.type,
        `Room row did not contain type "${room.type}"`
      );
      await this.expectUtils.expectElementToContainText(
        roomRow,
        `${room.roomName} row accessibility`,
        room.accessible,
        `Room row did not contain accessible value "${room.accessible}"`
      );
      await this.expectUtils.expectElementToContainText(
        roomRow,
        `${room.roomName} row price`,
        room.price,
        `Room row did not contain price "${room.price}"`
      );
      await this.expectUtils.expectElementToContainText(
        roomRow,
        `${room.roomName} row features`,
        featureText,
        `Room row did not contain feature details "${featureText}"`
      );
    });
  }

  /**
   * Submits the room form with an invalid price and verifies that creation fails.
   * @param {AdminRoomDetails} room - The room details to enter.
   * @param {string} invalidPrice - The invalid price value to submit.
   * @returns {Promise<void>} A promise that resolves when the validation failure is verified.
   */
  async verifyCreateRoomFailureForInvalidPrice(
    room: AdminRoomDetails,
    invalidPrice: string
  ): Promise<void> {
    await StepRunner.run(
      `Admin Rooms - verify invalid price prevents room "${room.roomName}"`,
      async () => {
        await this.fillRoomForm({ ...room, price: invalidPrice });
        await this.ui.element.click(AdminRoomsPageLocators.CREATE_BUTTON);
        await this.expectUtils.expectElementToBeVisible(
          AdminRoomsPageLocators.CREATE_ERROR_MESSAGE,
          'create room failure message',
          'Create room failure message was not visible'
        );
        await this.expectUtils.expectElementNotToBeVisible(
          this.getRoomRow(room.roomName),
          `room row for invalid room ${room.roomName}`,
          `Room "${room.roomName}" should not be visible after invalid price submission`
        );
      }
    );
  }

  /**
   * Fills the room creation form without submitting it.
   * @param {AdminRoomDetails} room - The room details to enter.
   * @returns {Promise<void>} A promise that resolves when the form is filled.
   */
  private async fillRoomForm(room: AdminRoomDetails): Promise<void> {
    await this.ui.editBox.fill(AdminRoomsPageLocators.ROOM_NAME_INPUT, room.roomName);
    await this.ui.dropdown.selectByLabel(AdminRoomsPageLocators.ROOM_TYPE_SELECT, room.type);
    await this.ui.dropdown.selectByLabel(
      AdminRoomsPageLocators.ACCESSIBLE_SELECT,
      room.accessible
    );
    await this.ui.editBox.fill(AdminRoomsPageLocators.ROOM_PRICE_INPUT, room.price);
    await this.setRoomFeatures(room.features ?? []);
  }

  /**
   * Applies the requested feature selections and clears unrequested features.
   * @param {RoomFeature[]} selectedFeatures - The feature names that should be checked.
   * @returns {Promise<void>} A promise that resolves when all feature checkboxes are set.
   */
  private async setRoomFeatures(selectedFeatures: RoomFeature[]): Promise<void> {
    const selectedFeatureSet = new Set(selectedFeatures);

    for (const feature of ALL_ROOM_FEATURES) {
      await this.ui.checkbox.setChecked(
        this.getFeatureCheckbox(feature),
        selectedFeatureSet.has(feature)
      );
    }
  }

  /**
   * Gets the locator for the room row matching a room name.
   * @param {string} roomName - The room name to locate.
   * @returns {Locator} The matching room row locator.
   */
  private getRoomRow(roomName: string): Locator {
    return this.locator(AdminRoomsPageLocators.ROOM_LISTING).filter({ hasText: roomName });
  }

  /**
   * Gets the checkbox selector for a supported room feature.
   * @param {RoomFeature} feature - The feature name.
   * @returns {string} The checkbox selector.
   */
  private getFeatureCheckbox(feature: RoomFeature): string {
    switch (feature) {
      case 'WiFi':
        return AdminRoomsPageLocators.FEATURE_WIFI_CHECKBOX;
      case 'TV':
        return AdminRoomsPageLocators.FEATURE_TV_CHECKBOX;
      case 'Radio':
        return AdminRoomsPageLocators.FEATURE_RADIO_CHECKBOX;
      case 'Refreshments':
        return AdminRoomsPageLocators.FEATURE_REFRESHMENTS_CHECKBOX;
      case 'Safe':
        return AdminRoomsPageLocators.FEATURE_SAFE_CHECKBOX;
      case 'Views':
        return AdminRoomsPageLocators.FEATURE_VIEWS_CHECKBOX;
    }
  }

  /**
   * Gets the expected room-details text for selected features.
   * @param {RoomFeature[] | undefined} features - The selected feature list.
   * @returns {string} The expected room-details text.
   */
  private getExpectedFeatureText(features?: RoomFeature[]): string {
    if (!features?.length) {
      return 'No features added to the room';
    }

    return features.join(', ');
  }
}
