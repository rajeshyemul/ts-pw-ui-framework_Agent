import type {
  RoomAccessible,
  RoomFeature,
  RoomType,
} from '@models/AdminRoomsPageTypes';

export const SUPPORTED_ROOM_TYPES: RoomType[] = [
  'Single',
  'Twin',
  'Double',
  'Family',
  'Suite',
];
export const SUPPORTED_ACCESSIBLE_OPTIONS: RoomAccessible[] = ['false', 'true'];
export const SUPPORTED_FEATURES: RoomFeature[] = [
  'WiFi',
  'TV',
  'Radio',
  'Refreshments',
  'Safe',
  'Views',
];

export const createUniqueRoomName = (scenarioId: string): string => {
  const uniqueSuffix = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;

  return `AGENTTEST-${scenarioId}-${uniqueSuffix}`;
};
