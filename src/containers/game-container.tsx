import { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '../components/button';
import { AuthenticationContext } from '../contexts/authentication-context';
import { Status, useQuery } from '../hooks/query-hook';
import { GameCreationResponse, GameResponse } from '../types/response-types';
import { Config } from '../util/configuration';
import { GameData, GameStatus } from '../util/data-types';

/**
 * Game container.
 * 
 */
export const GameContainer: FC = () => {
  const { authUser } = useContext(AuthenticationContext);
  const params = useParams<{ gameId: string }>();
  const [ game, setGame ] = useState<GameData>(null);
  const createGameQuery = useQuery<GameCreationResponse>();
  const gameQuery = useQuery<GameResponse>();

  useEffect(() => {
    switch (createGameQuery.status) {
      case Status.SUCCESS:
        gameQuery.get(`${Config.API_URL}/games/${createGameQuery.response.id}`);
        break;
      case Status.ERROR:
        console.error('Could not create new game :', createGameQuery.errorResponse.errors);
        break;
    }
  }, [createGameQuery.status]);

  useEffect(() => {
    switch (gameQuery.status) {
      case Status.INIT:
        if (params.gameId != null) {
          gameQuery.get(`${Config.API_URL}/games/${params.gameId}`);
        }
        break;
      case Status.SUCCESS:
        setGame(gameQuery.response.game);
        break;
      case Status.ERROR:
        console.error('Could not get game :', gameQuery.errorResponse.errors);
        break;
    }
  }, [gameQuery.status]);

  const handleCreateGame = () => {
    createGameQuery.post(`${Config.API_URL}/games`, {
      author: 'test' // TODO Add author name
    });
  }
  
  return (
    <div>
    {game == null && <Button variant="primary" onClick={handleCreateGame}>Nouvelle partie</Button>}
    {game?.status === GameStatus.INIT &&
      <>
        {/* Player list and start button */}
      </>
    }
    {game?.status === GameStatus.IN_PROGRESS &&
      <>
        {/* Game in progress */}
      </>
    }
    {game?.status === GameStatus.FINISHED &&
      <>
        {/* Game finished (stats, leaderboard, ...) */}
      </>
    }
    </div>
  );
}
