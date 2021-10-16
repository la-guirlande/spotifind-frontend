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
 * Spotify user data.
 */
 export interface SpotifyUserData extends BaseData {
  href: string;
  email: string;
  display_name: string;
  country: string;
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
