import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {  } from "@fortawesome/free-regular-svg-icons";

/**
 * Global configuration.
 */
export enum Config {
  API_URL = 'http://localhost'
}

/**
 * FontAwesome configuration.
 */
export const faConfig = {
  load: () => library.add(faHome),
  reset: () => library.reset()
}
