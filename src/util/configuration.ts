import { library } from "@fortawesome/fontawesome-svg-core";
import { } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight, faCircle, faExclamationCircle, faHome, faPlay, faSpinner } from "@fortawesome/free-solid-svg-icons";

/**
 * Global configuration.
 */
export enum Config {
  API_URL = 'http://localhost',
  WEBSOCKET_URL = 'http://localhost:8000',
  SPOTIFY_CLIENT_ID = '3df18684f075416587d57316c9d5165f',
  REDIRECT_URI = 'http://localhost:3000/callback',
  SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize',
  SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token',
  SPOTIFY_API_URL = 'https://api.spotify.com/v1',
  CODE_LENGTH = 6
}

/**
 * FontAwesome configuration.
 */
export const faConfig = {
  load: () => library.add(faArrowRight, faCircle, faExclamationCircle, faHome, faPlay, faSpinner),
  reset: () => library.reset()
}
