import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {  } from "@fortawesome/free-regular-svg-icons";

/**
 * Global configuration.
 */
export enum Config {
  API_URL = 'http://localhost',
  SPOTIFY_CLIENT_ID = '3df18684f075416587d57316c9d5165f',
  REDIRECT_URI = 'http://localhost:3000/callback',
  SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize',
  SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
}

/**
 * FontAwesome configuration.
 */
export const faConfig = {
  load: () => library.add(faHome),
  reset: () => library.reset()
}