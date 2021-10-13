import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link } from './link';

/**
 * Sidebar component.
 */
export const Sidebar: FC = () => {
  return (
    <div className="container px-4 bg-white dark:bg-black">
      <div className="flex flex-col">
        <div className="py-2">
          <ReactRouterLink to="/">
            <img src="https://logo-marque.com/wp-content/uploads/2020/09/Spotify-Logo.png" width={150} alt="Spotifind logo" />
          </ReactRouterLink>
        </div>
        <div>
          <Link to="/" variant="light">
            <FontAwesomeIcon icon="home" /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}
