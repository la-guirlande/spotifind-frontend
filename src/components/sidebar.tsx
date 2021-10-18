import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link } from './link';

/**
 * Sidebar component.
 */
export const Sidebar: FC = () => {
  return (
    <div className="container flex flex-col px-4 bg-white dark:bg-black">
      <div className="py-2">
        <ReactRouterLink to="/">
          <img src="https://logo-marque.com/wp-content/uploads/2020/09/Spotify-Logo.png" width={150} alt="Spotifind logo" />
        </ReactRouterLink>
      </div>
      <div className="flex flex-col space-y-4">
        <Link to="/" variant="light">
          <FontAwesomeIcon icon="home" /> Home
        </Link>
        <Link to="/play" variant="light">
          <FontAwesomeIcon icon="play" /> Play
        </Link>
      </div>
    </div>
  );
}
