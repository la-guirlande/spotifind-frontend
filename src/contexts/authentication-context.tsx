import { createContext, FC, useEffect, useState } from 'react';
import { useAuthentication } from '../hooks/authentication-hook';
import { Status, useQuery } from '../hooks/query-hook';
import { Config } from '../util/configuration';
import { UserData } from '../util/data-types';
import { LocalStorageKey } from '../util/local-storage';
import { UserInfoResponse } from '../types/response-types';

/**
 * Authentication context state.
 */
export type AuthenticationContextState = {
  authUser: UserData,
  setAuthUser(authUser: UserData): void;
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
  const [authUser, setAuthUser] = useState<UserData>(null);
  const auth = useAuthentication();
  const userInfoQuery = useQuery<UserInfoResponse>();

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
        setAuthUser(userInfoQuery.response.user);
        console.log(`Authenticated with access token ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}`);
        break;
      case Status.ERROR:
        console.error('Authentication failed :', userInfoQuery.errorResponse.errors);
        break;
    }
  }, [userInfoQuery.status]);

  return (
    <AuthenticationContext.Provider value={{ authUser, setAuthUser }}>{props.children}</AuthenticationContext.Provider>
  );
}
