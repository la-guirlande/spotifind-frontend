import randomString from 'crypto-random-string';
import _ from 'lodash';
import { useContext, useEffect } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import { Config } from '../util/configuration';
import crypto from '../util/crypto';
import { LocalStorageKey } from '../util/local-storage';
import { SpotifyTokenResponse } from '../util/response-types';
import { Status, useQuery } from './query-hook';
import { useQueryParams } from './query-params-hook';

/**
 * Spotify hook data.
 */
export interface Spotify {
  
}

/**
 * Spotify hook.
 * 
 * This hook is used to make Spotify API calls.
 * 
 * @returns Spotify hook data
 */
export const useSpotify = (): Spotify => {

  return {  };
}
