import { FC, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthenticationContext } from './contexts/authentication-context';
import { ConnectionPage } from './pages/connection-page';
import { HomePage } from './pages/home-page';

/**
 * Router component.
 */
export const Router: FC = () => {
  const { authUser } = useContext(AuthenticationContext);

  return (
    <Switch>
      {authUser == null
      ? <>
          <Route path="/callback">
            <ConnectionPage callback />
          </Route>
          <Route path="/">
            <ConnectionPage />
          </Route>
        </>
      : <>
          <Route path="/">
            <HomePage />
          </Route>
        </>
      }
    </Switch>
  );
}
