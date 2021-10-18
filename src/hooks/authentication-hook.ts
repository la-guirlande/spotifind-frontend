import randomString from 'crypto-random-string';
import _ from 'lodash';
import { useEffect } from 'react';
import { Config } from '../util/configuration';
import crypto from '../util/crypto';
import { LocalStorageKey } from '../util/local-storage';
import { AccessTokenResponse, SpotifyTokenResponse } from '../util/response-types';
import { Status, useQuery } from './query-hook';
import { useQueryParams } from './query-params-hook';

/**
 * Authentication hook data.
 */
 export interface Authentication {
  connect: () => Promise<void>;
  token: () => void;
}

/**
 * Authentication hook.
 * 
 * This hook is used to connect to Spotify accounts service and Spotifind backend.
 * 
 * @returns Authentication hook data
 */
export const useAuthentication = (): Authentication => {
  const queryParams = useQueryParams();
  const tokenQuery = useQuery<SpotifyTokenResponse>();
  const accessTokenQuery = useQuery<AccessTokenResponse>();

  useEffect(() => {
    switch (tokenQuery.status) {
      case Status.SUCCESS:
        localStorage.removeItem(LocalStorageKey.OAUTH2_CODE_VERIFIER);
        localStorage.removeItem(LocalStorageKey.OAUTH2_STATE);
        localStorage.setItem(LocalStorageKey.SPOTIFY_ACCESS_TOKEN, tokenQuery.response.access_token);
        localStorage.setItem(LocalStorageKey.SPOTIFY_REFRESH_TOKEN, tokenQuery.response.refresh_token);
        tokenQuery.reset();
        accessTokenQuery.post(`${Config.API_URL}/auth/accessToken`, { spotify_access_token: tokenQuery.response.access_token })
        break;
      case Status.ERROR:
        localStorage.removeItem(LocalStorageKey.OAUTH2_CODE_VERIFIER);
        localStorage.removeItem(LocalStorageKey.OAUTH2_STATE);
        console.log('Could not get tokens from Spotify :', tokenQuery.errorResponse.errors);
        tokenQuery.reset();
        break;
    }
  }, [tokenQuery.status]);

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

  const connect = async () => {
    if (localStorage.getItem(LocalStorageKey.SPOTIFY_REFRESH_TOKEN) == null) {
      const scopes = 'user-read-private user-read-email';
      const responseType = 'code';
      const redirectUri = Config.REDIRECT_URI;
      const codeVerifier = randomString({ length: _.random(43, 128, false) });
      const codeChallengeMethod = 'S256';
      const codeChallenge = crypto.base64(await crypto.sha256(codeVerifier));
      const state = randomString({ length: 10 });
      localStorage.setItem(LocalStorageKey.OAUTH2_CODE_VERIFIER, codeVerifier);
      localStorage.setItem(LocalStorageKey.OAUTH2_STATE, state);
      window.location.href = `${Config.SPOTIFY_AUTHORIZE_URL}?response_type=${responseType}&client_id=${Config.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=${codeChallengeMethod}&code_challenge=${codeChallenge}&state=${state}`;
    } else {
      const body = new URLSearchParams();
      body.append('grant_type', 'refresh_token');
      body.append('refresh_token', localStorage.getItem(LocalStorageKey.SPOTIFY_REFRESH_TOKEN));
      body.append('client_id', Config.SPOTIFY_CLIENT_ID);
      tokenQuery.post(Config.SPOTIFY_TOKEN_URL, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    }
  }

  const token = () => {
    if (queryParams.get('state') === localStorage.getItem(LocalStorageKey.OAUTH2_STATE)) {
      const body = new URLSearchParams();
      body.append('client_id', Config.SPOTIFY_CLIENT_ID);
      body.append('grant_type', 'authorization_code');
      body.append('code', queryParams.get('code'));
      body.append('redirect_uri', Config.REDIRECT_URI);
      body.append('code_verifier', localStorage.getItem(LocalStorageKey.OAUTH2_CODE_VERIFIER));
      tokenQuery.post(Config.SPOTIFY_TOKEN_URL, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    } else {
      console.error('Invalid OAuth2 state');
    }
  }

  return { connect, token };
}
