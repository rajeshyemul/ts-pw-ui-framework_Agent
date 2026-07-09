export class BookingHomePageLocators {
  static readonly BODY = 'body';
  static readonly HERO_TITLE = 'h1';
  static readonly ROOMS_SECTION_HEADING = 'text=Our Rooms';
  static readonly AVAILABILITY_CARD =
    '.card:has(h3.card-title):has(button:has-text("Check Availability"))';
  static readonly ROOM_CARD_TITLE = 'h5.card-title';
  static readonly ROOM_CARD_DESCRIPTION = 'p.card-text';
  static readonly ROOM_CARD_FEATURE = '.badge';
  static readonly ROOM_CARD_BOOK_BUTTON = 'button:has-text("Book now")';
}
