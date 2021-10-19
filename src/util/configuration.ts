import { library } from "@fortawesome/fontawesome-svg-core";
import { } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

/**
 * Global configuration.
 */
export enum Config {
  API_URL = 'http://localhost',
  SPOTIFY_CLIENT_ID = '3df18684f075416587d57316c9d5165f',
  REDIRECT_URI = 'http://localhost:3000/callback',
  SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize',
  SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token',
  SPOTIFY_API_URL = 'https://api.spotify.com/v1'
}

/**
 * FontAwesome configuration.
 */
export const faConfig = {
  load: () => library.add(faHome),
  reset: () => library.reset()
}
