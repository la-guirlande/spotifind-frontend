import { ErrorData, UserData } from './data-types';

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
 * Access token response.
 * 
 * Returned by `POST /auth/accessToken`
 */
export interface AccessTokenResponse extends Response {
  access_token: string;
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
