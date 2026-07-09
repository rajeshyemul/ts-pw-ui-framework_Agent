export type RoomType = 'Single' | 'Twin' | 'Double' | 'Family' | 'Suite';
export type RoomAccessible = 'true' | 'false';
export type RoomFeature = 'WiFi' | 'TV' | 'Radio' | 'Refreshments' | 'Safe' | 'Views';

export type AdminRoomDetails = {
  roomName: string;
  type: RoomType;
  accessible: RoomAccessible;
  price: string;
  features?: RoomFeature[];
};
