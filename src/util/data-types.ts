import { ErrorResponse } from './response-types';

/**
 * Base data.
 */
export interface BaseData {
  id: string;
}

/**
 * Error data.
 */
export interface ErrorData {
  error:
    'access_denied'
  | 'network_error';
  error_description: string;
}

/**
 * User data.
 */
export interface UserData extends BaseData {
  spotifyId: string;
}

/**
 * Game data.
 */
export interface GameData extends BaseData {
  status: GameStatus;
  code: string;
  players: PlayerData[];
  playlistId: string;
  shuffle: boolean;
}

/**
 * Game status.
 */
export enum GameStatus {
  INIT = 0, TIMER_BETWEEN = 1, TIMER_CURRENT = 2, FINISHED = 3
}

/**
 * Player data.
 */
export interface PlayerData extends BaseData {
  // target: UserData;
  name: string;
  author: boolean;
  score: number;
}

/**
 * Spotify user data.
 */
export interface SpotifyUserData extends BaseData {
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  images: {
    url: string;
    width: string;
    height: string;
  }[];
}

/**
 * Spotify artist data.
 */
 export interface SpotifyrtistData extends BaseData {
  href: string;
  name: string;
  genres: string[];
  followers: {
    total: number;
  };
  images: [{
    url: string;
    width: number;
    height: number;
  }];
  external_urls: {
    spotify: string;
  };
}

/**
 * Spotify track data.
 */
export interface SpotifyTrackData extends BaseData {
  href: string;
  name: string;
  artists: [{
    name: string;
  }];
  album: {
    name: string;
    images: [{
      url: string;
      width: number;
      height: number;
    }];
    release_date: string;
  };
  external_urls: {
    spotify: string;
  };
}

/**
 * Spotify playlist data.
 */
export interface SpotifyPlaylistData extends BaseData {
  href: string;
  name: string;
  description: string;
  public: boolean;
  collaborative: boolean;
  owner: {
    id: string;
    display_name: string;
    href: string;
  };
  tracks: {
    href: string;
    total: number;
  };
  images: [{
    url: string;
    width: number;
    height: number;
  }];
  external_urls: {
    spotify: string;
  };
}

/**
 * Spotify player data.
 */
export interface SpotifyPlayerData {
  device: {
    id: string;
    is_active: boolean
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: 100;
  };
  shuffle_state: boolean;
  repeat_state: string;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: {
    id: string;
    name: string;
    popularity: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
      spotify: string;
    };
    artists: {
      id: string;
      name: string;
      external_urls: {
        spotify: string;
      };
    }[];
  };
}

/**
 * Websocket event types.
 */
export enum WebsocketEventType {
  ERROR = 'error', TEST = 'test', JOIN = 'join', LEAVE = 'leave', CONNECT = 'co', START = 'start'
}

/**
 * Base websocket event.
 */
export interface WebsocketEvent {}

/**
 * Websocket error event.
 */
export interface WebsocketErrorEvent extends Event, ErrorResponse {}

/**
 * Websocket test event (client to server).
 */
export interface WebsocketTestClientToServerEvent extends WebsocketEvent {
  [key: string]: unknown;
}

/**
 * Websocket test event (server to client).
 */
export interface WebsocketTestServerToClientEvent extends WebsocketEvent {
  [key: string]: unknown;
}

/**
 * Websocket join event (client to server).
 */
export interface WebsocketJoinClientToServerEvent extends WebsocketEvent {
  code: string;
  name: string;
}

/**
 * Websocket join event (server to client).
 */
export interface WebsocketJoinServerToClientEvent extends WebsocketEvent {
  token: string;
}

/**
 * Websocket leave event (client to server).
 */
export interface WebsocketLeaveClientToServerEvent extends WebsocketEvent {
  token: string;
}

/**
 * Websocket leave event (server to client).
 */
export interface WebsocketLeaveServerToClientEvent extends WebsocketEvent {
  game: GameData;
}

/**
 * Websocket connect event (client to server).
 */
export interface WebsocketConnectClientToServerEvent extends WebsocketEvent {
  token: string;
}

/**
 * Websocket connect event (server to client).
 */
export interface WebsocketConnectServerToClientEvent extends WebsocketEvent {
  game: GameData;
  player: PlayerData;
}

/**
 * Websocket start event (client to server).
 */
export interface WebsocketStartClientToServerEvent extends WebsocketEvent {
  token: string;
  playlistId: string;
  shuffle: boolean;
}

/**
 * Websocket start event (server to broadcast).
 */
export interface WebsocketStartServerToClientEvent extends WebsocketEvent {
  game: GameData;
}
