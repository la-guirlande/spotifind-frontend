import randomString from 'crypto-random-string';
import _ from 'lodash';
import { useEffect } from 'react';
import { Config } from '../util/configuration';
import * as crypto from '../util/crypto';
import { LocalStorageKey } from '../util/local-storage';
import { SpotifyTokenResponse } from '../util/response-types';
import { Status, useQuery } from './query-hook';
import { useQueryParams } from './query-params-hook';

/**
 * Spotify hook data.
 */
export interface Spotify {
  connect: () => Promise<void>;
  token: () => void;
}

/**
 * Spotify hook.
 * 
 * This hook is used to manage the current Spotify account logged in with application, and make some Spotify API calls.
 * 
 * @returns Spotify hook data
 */
export const useSpotify = (): Spotify => {
  const queryParams = useQueryParams();
  const tokenQuery = useQuery<SpotifyTokenResponse>();

  useEffect(() => {
    switch (tokenQuery.status) {
      case Status.SUCCESS:
        localStorage.removeItem(LocalStorageKey.OAUTH2_CODE_VERIFIER);
        localStorage.removeItem(LocalStorageKey.OAUTH2_STATE);
        localStorage.setItem(LocalStorageKey.SPOTIFY_ACCESS_TOKEN, tokenQuery.response.access_token);
        localStorage.setItem(LocalStorageKey.SPOTIFY_REFRESH_TOKEN, tokenQuery.response.refresh_token);
        tokenQuery.reset();
        break;
      case Status.ERROR:
        localStorage.removeItem(LocalStorageKey.OAUTH2_CODE_VERIFIER);
        localStorage.removeItem(LocalStorageKey.OAUTH2_STATE);
        tokenQuery.reset();
        break;
    }
  }, [tokenQuery.status]);

  const connect = async () => {
    if (localStorage.getItem(LocalStorageKey.SPOTIFY_REFRESH_TOKEN) == null) {
      const scopes = 'user-read-private user-read-email';
      const responseType = 'code';
      const redirectUri = Config.REDIRECT_URI;
      const codeVerifier = randomString({ length: _.random(43, 128, false) });
      const codeChallengeMethod = 'S256';
      const codeChallenge = await crypto.pkceChallengeFromVerifier(codeVerifier);
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
