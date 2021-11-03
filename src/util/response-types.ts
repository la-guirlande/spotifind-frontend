import { ErrorData, GameData, SpotifyPlayerData, SpotifyPlaylistData, SpotifyUserData, UserData } from './data-types';

/**
 * Base response.
 */
export interface Response {}

/**
 * Error response.
 * 
 * Returned when any error occurs.
 */
export interface ErrorResponse extends Response {
  errors: ErrorData[];
}

/**
 * Creation response.
 * 
 * Returned after some POST requests.
 */
export interface CreationResponse extends Response {
  id: string;
}

/**
 * User information response.
 * 
 * Returned by `GET /users/info`.
 */
export interface UserInfoResponse extends Response {
  user: UserData;
}

/**
 * Refresh token response.
 * 
 * Returned by `POST /auth/refreshToken`
 */
export interface AccessTokenResponse extends Response {
  refresh_token: string;
  access_token: string;
}

/**
 * Games response.
 * 
 * Returned by `GET /games`
 */
export interface GamesResponse extends Response {
  games: GameData[];
}

/**
 * Game response.
 * 
 * Returned by `GET /games/:gameId`
 */
export interface GameResponse extends Response {
  game: GameData;
}

/**
 * Game creation response.
 * 
 * Returned by `POST /games`
 */
export interface GameCreationResponse extends CreationResponse {
  code: string;
  token: string;
}

/**
 * Spotify token response.
 * 
 * Returned by `POST https://accounts.spotify.com/api/token`
 */
export interface SpotifyTokenResponse extends Response {
  access_token: string;
  refresh_token: string;
  scope: string;
}

/**
 * Spotify user response.
 * 
 * Returned by `GET /me` or `GET /users/:userId`
 */
export interface SpotifyUserResponse extends Response, SpotifyUserData {}

/**
 * Spotify playlists response.
 * 
 * Returned by `GET /me/playlists`.
 */
 export interface SpotifyPlaylistsResponse extends Response {
   items: SpotifyPlaylistData[];
   total: number;
 }

/**
 * Spotify player response.
 * 
 * Returned by `GET /me/player`.
 */
export interface SpotifyPlayerResponse extends Response, SpotifyPlayerData {}
