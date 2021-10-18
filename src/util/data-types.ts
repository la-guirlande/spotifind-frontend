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
  players: PlayerData;
}

/**
 * Game status.
 */
export enum GameStatus {
  INIT = 0, IN_PROGRESS = 1, FINISHED = 2
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
