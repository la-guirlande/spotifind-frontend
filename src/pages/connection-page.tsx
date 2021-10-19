import { FC, useEffect } from 'react';
import { Button } from '../components/button';
import { useAuthentication } from '../hooks/authentication-hook';

/**
 * Connection page props.
 */
export interface ConnectionPageProps {
  callback?: boolean;
}

/**
 * Connection page.
 */
export const ConnectionPage: FC<ConnectionPageProps> = ({ callback }) => {
  const auth = useAuthentication();

  useEffect(() => {
    if (callback) {
      auth.token();
    }
  }, []);

  return (
    <Button variant="primary" onClick={auth.connect}>Connect to Spotify</Button>
  );
}

ConnectionPage.defaultProps = {
  callback: false
}
