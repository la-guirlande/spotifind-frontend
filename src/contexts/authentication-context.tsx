import { createContext, FC, useEffect, useState } from 'react';
import { useAuthentication } from '../hooks/authentication-hook';
import { Status, useQuery } from '../hooks/query-hook';
import { Config } from '../util/configuration';
import { SpotifyUserData } from '../util/data-types';
import { LocalStorageKey } from '../util/local-storage';
import { SpotifyUserResponse, UserInfoResponse } from '../util/response-types';

/**
 * Authentication context state.
 */
export type AuthenticationContextState = {
  authUser: SpotifyUserData,
  setAuthUser(authUser: SpotifyUserData): void;
}

/**
 * Authentication context.
 * 
 * This context is used to manages the authenticated user.
 */
export const AuthenticationContext = createContext<AuthenticationContextState>({ authUser: null, setAuthUser: null });

/**
 * Authentication context provider.
 */
export const AuthenticationContextProvider: FC = (props) => {
  const [authUser, setAuthUser] = useState<SpotifyUserData>(null);
  const auth = useAuthentication();
  const userInfoQuery = useQuery<UserInfoResponse>();
  const spotifyUserQuery = useQuery<SpotifyUserResponse>();

  useEffect(() => {
    switch (userInfoQuery.status) {
      case Status.INIT:
        const accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
        if (accessToken == null) {
          const spotifyRefreshToken = localStorage.getItem(LocalStorageKey.SPOTIFY_REFRESH_TOKEN);
          if (spotifyRefreshToken != null) {
            auth.connect();
          }
        } else {
          userInfoQuery.get(`${Config.API_URL}/users/info`, { headers: { Authorization: `Bearer ${accessToken}` } });
        }
        break;
      case Status.SUCCESS:
        spotifyUserQuery.get(`${Config.SPOTIFY_API_URL}/users/${userInfoQuery.response.user.spotifyId}`, { headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.SPOTIFY_ACCESS_TOKEN)}` } });
        console.log(`Authenticated with access token ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}`);
        break;
      case Status.ERROR:
        console.error('Authentication failed :', userInfoQuery.errorResponse.errors);
        break;
    }
  }, [userInfoQuery.status]);

  useEffect(() => {
    switch (spotifyUserQuery.status) {
      case Status.SUCCESS:
        setAuthUser(spotifyUserQuery.response);
        break;
      case Status.ERROR:
        console.error('Could not get Spotify user :', spotifyUserQuery.errorResponse.errors);
        break;
    }
  }, [spotifyUserQuery.status]);

  return <AuthenticationContext.Provider value={{ authUser, setAuthUser }}>{props.children}</AuthenticationContext.Provider>;
}
