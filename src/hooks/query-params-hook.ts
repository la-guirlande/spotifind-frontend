import { useLocation } from 'react-router'

/**
 * Query parameters hook.
 * 
 * This hook is used to read query parameters in the current URL.
 * 
 * @returns Query parameters
 */
export const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
}
