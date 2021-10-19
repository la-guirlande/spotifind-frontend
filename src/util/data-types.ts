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
