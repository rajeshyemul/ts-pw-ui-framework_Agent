export class AdminRoomsPageLocators {
  static readonly BODY = 'body';
  static readonly CREATE_BUTTON = 'button:has-text("Create")';
  static readonly LOGOUT_BUTTON = 'button:has-text("Logout")';
  static readonly ROOM_LISTING = '[data-testid="roomlisting"]';
  static readonly ROOM_NUMBER_LABEL = 'text=Room #';
  static readonly ROOM_DETAILS_LABEL = 'text=Room details';
  static readonly ROOM_NAME_INPUT = '#roomName';
  static readonly ROOM_TYPE_SELECT = '#type';
  static readonly ROOM_TYPE_OPTIONS = '#type option';
  static readonly ACCESSIBLE_SELECT = '#accessible';
  static readonly ACCESSIBLE_OPTIONS = '#accessible option';
  static readonly ROOM_PRICE_INPUT = '#roomPrice';
  static readonly FEATURE_WIFI_CHECKBOX = '#wifiCheckbox';
  static readonly FEATURE_TV_CHECKBOX = '#tvCheckbox';
  static readonly FEATURE_RADIO_CHECKBOX = '#radioCheckbox';
  static readonly FEATURE_REFRESHMENTS_CHECKBOX = '#refreshCheckbox';
  static readonly FEATURE_SAFE_CHECKBOX = '#safeCheckbox';
  static readonly FEATURE_VIEWS_CHECKBOX = '#viewsCheckbox';
  static readonly CREATE_ERROR_MESSAGE = 'p:has-text("Failed to create room")';
}
