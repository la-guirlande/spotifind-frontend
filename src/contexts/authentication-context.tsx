import { createContext, FC, useEffect, useState } from 'react';
import { Status, useQuery } from '../hooks/query-hook';
import { Config } from '../util/configuration';
import { UserData } from '../util/data-types';
import { LocalStorageKey } from '../util/local-storage';
import { AccessTokenResponse, UserInfoResponse } from '../util/response-types';

/**
 * Authentication context state.
 */
export type AuthenticationContextState = {
  authUser: UserData,
  setAuthUser(authUser: UserData): void;
  refresh(): void;
}

/**
 * Authentication context.
 * 
 * This context is used to manages the authenticated user.
 */
export const AuthenticationContext = createContext<AuthenticationContextState>({ authUser: null, setAuthUser: null, refresh: null });

/**
 * Authentication context provider.
 */
export const AuthenticationContextProvider: FC = (props) => {
  const [authUser, setAuthUser] = useState<UserData>(null);
  const userInfoQuery = useQuery<UserInfoResponse>();
  const accessTokenQuery = useQuery<AccessTokenResponse>();

  useEffect(() => {
    switch (userInfoQuery.status) {
      case Status.INIT:
        const accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
        if (accessToken == null) {
          const spotifyAccessToken = localStorage.getItem(LocalStorageKey.SPOTIFY_ACCESS_TOKEN);
          if (spotifyAccessToken != null) {
            accessTokenQuery.post(`${Config.API_URL}/auth/accessToken`, { spotify_access_token: spotifyAccessToken });
          }
        } else {
          userInfoQuery.get(`${Config.API_URL}/users/info`, { headers: { Authorization: `Bearer ${accessToken}` } });
        }
        break;
      case Status.SUCCESS:
        setAuthUser(userInfoQuery.response.user);
        console.log(`Authenticated with access token ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}`);
        break;
      case Status.ERROR:
        const spotifyAccessToken = localStorage.getItem(LocalStorageKey.SPOTIFY_ACCESS_TOKEN);
        if (spotifyAccessToken && userInfoQuery.code === 401) {
          accessTokenQuery.post(`${Config.API_URL}/auth/accessToken`, { spotify_access_token: spotifyAccessToken });
        } else {
          console.error('Authentication failed :', userInfoQuery.errorResponse.errors);
        }
        break;
    }
  }, [userInfoQuery.status]);

  useEffect(() => {
    switch (accessTokenQuery.status) {
      case Status.SUCCESS:
        const { access_token } = accessTokenQuery.response;
        localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, access_token);
        break;
      case Status.ERROR:
        console.error('Authentication failed :', accessTokenQuery.errorResponse.errors);
        break;
    }
  }, [accessTokenQuery.status]);

  const refresh = () => {
    userInfoQuery.reset();
  }

  return (
    <AuthenticationContext.Provider value={{ authUser, setAuthUser, refresh }}>{props.children}</AuthenticationContext.Provider>
  );
}
