import { FC, useEffect } from 'react';
import { Button } from '../components/button';
import { useSpotify } from '../hooks/spotify-hook';

/**
 * Connection page props.
 */
export interface ConnectionPageProps {
  callback?: boolean;
}

/**
 * Connection page.
 *  
 */
export const ConnectionPage: FC<ConnectionPageProps> = ({ callback }) => {
  const spotify = useSpotify();

  useEffect(() => {
    if (callback) {
      spotify.token();
    }
  }, []);

  return (
    <Button variant="primary" onClick={spotify.connect}>Connect to Spotify</Button>
  );
}

ConnectionPage.defaultProps = {
  callback: false
}
