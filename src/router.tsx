import { FC, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthenticationContext } from './contexts/authentication-context';
import { ConnectionPage } from './pages/connection-page';
import { HomePage } from './pages/home-page';

/**
 * Router component.
 */
export const Router: FC = () => {
  const { authUser } = useContext(AuthenticationContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/callback">
          <ConnectionPage callback />
        </Route>
        <Route path="/">
          {authUser == null ? <ConnectionPage /> : <HomePage />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
