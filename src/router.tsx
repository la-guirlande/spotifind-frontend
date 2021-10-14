import { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/home-page';

/**
 * Router component.
 */
export const Router: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  </BrowserRouter>
);
