import { createContext, FC, useEffect, useState } from 'react';
import { Status, useQuery } from '../../hooks/query-hook';
import { Config } from '../../types/configuration';
import { UserData } from '../../types/data-types';
import { LocalStorageKey } from '../../types/local-storage';
import { AccessTokenResponse, UserInfoResponse } from '../../types/response-types';

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
  const userInfoQuery = useQuery<UserInfoResponse>();
  const accessTokenQuery = useQuery<AccessTokenResponse>();

  useEffect(() => {
    switch (userInfoQuery.status) {
      case Status.INIT:
        const accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
        if (accessToken != null) {
          userInfoQuery.get(`${Config.API_URL}/users/info`, { headers: { Authorization: `Bearer ${accessToken}` } });
        }
        break;
      case Status.SUCCESS:
        setAuthUser(userInfoQuery.response.user);
        console.log(`Authenticated with access token ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}`);
        break;
      case Status.ERROR:
        const refreshToken = localStorage.getItem(LocalStorageKey.REFRESH_TOKEN);
        if (refreshToken && userInfoQuery.code === 401) {
          accessTokenQuery.post(`${Config.API_URL}/auth/accessToken`, { refresh_token: refreshToken });
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
        userInfoQuery.reset();
        break;
      case Status.ERROR:
        console.error('Authentication failed :', accessTokenQuery.errorResponse.errors);
        break;
    }
  }, [accessTokenQuery.status]);

  return (
    <AuthenticationContext.Provider value={{ authUser, setAuthUser }}>{props.children}</AuthenticationContext.Provider>
  );
}
