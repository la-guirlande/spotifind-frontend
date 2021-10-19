import _ from 'lodash';
import { FC, useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { Button } from '../components/button';
import { JoinGameForm, JoinGameFormValues } from '../components/forms/join-game-form';
import { GameInfo } from '../components/games/game-info';
import { AuthenticationContext } from '../contexts/authentication-context';
import { useGame } from '../hooks/game-hook';
import { Status, useQuery } from '../hooks/query-hook';
import { Config } from '../util/configuration';
import { GameStatus } from '../util/data-types';
import { LocalStorageKey } from '../util/local-storage';
import { GamesResponse } from '../util/response-types';

/**
 * Game container.
 * 
 */
export const GameContainer: FC = () => {
  const { authUser } = useContext(AuthenticationContext);
  const gameHook = useGame(localStorage.getItem(LocalStorageKey.GAME_TOKEN));
  const params = useParams<{ gameId: string }>();
  const preloadGameQuery = useQuery<GamesResponse>();

  const preloaded = useMemo(() => preloadGameQuery.status === Status.SUCCESS && preloadGameQuery.response.games.length === 1, [preloadGameQuery.status]);

  useEffect(() => console.log('Update current game :', gameHook.game), [gameHook.game]);

  useEffect(() => {
    switch (preloadGameQuery.status) {
      case Status.SUCCESS:
        console.log(preloadGameQuery.response.games);
        break;
      case Status.ERROR:
        console.error('Could not preload game :', preloadGameQuery.errorResponse.errors);
        break;
    }
  }, [preloadGameQuery.status]);

  const handleCreateGame = () => {
    gameHook.create(_.random(0, 1000).toString());
  }

  const handlePreloadGame = (code: string) => {
    preloadGameQuery.get(`${Config.API_URL}/games?code=${code}`);
  }

  const handleJoinGame = (data: JoinGameFormValues) => {
    gameHook.join(data.code);
  }

  const handleStartGame = () => {
    gameHook.start();
  }
  
  return (
    <div className="flex flex-col px-4">
    {gameHook.game == null &&
      <>
        <div className="flex flex-row justify-between">
            <Button variant="primary" onClick={handleCreateGame}>Create new game</Button>
            <span className="text-xl font-bold">OR</span>
            <JoinGameForm preloaded={preloaded} onPreload={handlePreloadGame} onSubmit={handleJoinGame} onError={console.error} />
        </div>
        <div className="my-4">
          <GameInfo game={preloadGameQuery?.response?.games[0]} loading={preloadGameQuery.status === Status.IN_PROGRESS} />
        </div>
      </>
    }
    {gameHook.game?.status === GameStatus.INIT &&
      <>INIT
        <GameInfo game={gameHook.game} />
        <Button variant="primary" onClick={handleStartGame}>Start game</Button>
      </>
    }
    {gameHook.game?.status === GameStatus.IN_PROGRESS &&
      <>IN PROGRESS
        {/* Game in progress */}
      </>
    }
    {gameHook.game?.status === GameStatus.FINISHED &&
      <>FINISHED
        {/* Game finished (stats, leaderboard, ...) */}
      </>
    }
    </div>
  );
}
