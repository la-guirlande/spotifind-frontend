/**
 * Base data.
 */
export interface BaseData {
  id: string;
}

/**
 * Error data.
 */
export interface ErrorData {
  error:
    'access_denied'
  | 'network_error';
  error_description: string;
}

/**
 * User data.
 */
export interface UserData extends BaseData {
  email: string;
  name: string;
}
