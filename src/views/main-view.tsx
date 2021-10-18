import { FC } from 'react';
import { Route, Switch } from 'react-router';
import { GameContainer } from '../containers/game-container';

/**
 * Main view.
 * 
 * This view is showed at the center of the home page.
 */
export const MainView: FC = () => (
  <div className="container flex flex-col px-4">
    <Switch>
      <Route path="/play/:gameId?">
        <GameContainer />
      </Route>
      <Route path="/">
        <>Main view</>
      </Route>
    </Switch>
  </div>
);
