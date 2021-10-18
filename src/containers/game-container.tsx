import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '../components/button';
import { JoinGameForm } from '../components/forms/join-game-form';
import { GameInfo } from '../components/games/game-info';
import { AuthenticationContext } from '../contexts/authentication-context';
import { WebsocketContext } from '../contexts/websocket-context';
import { Status, useQuery } from '../hooks/query-hook';
import { Config } from '../util/configuration';
import { GameData, GameStatus, WebsocketConnectClientToServerEvent, WebsocketConnectServerToClientEvent, WebsocketEventType, WebsocketJoinServerToClientEvent } from '../util/data-types';
import { GameCreationResponse, GameResponse, GamesResponse } from '../util/response-types';

/**
 * Game container.
 * 
 */
export const GameContainer: FC = () => {
  const { authUser } = useContext(AuthenticationContext);
  const { socket } = useContext(WebsocketContext);
  const params = useParams<{ gameId: string }>();
  const [game, setGame] = useState<GameData>(null);
  const [token, setToken] = useState<string>(null);
  const createGameQuery = useQuery<GameCreationResponse>();
  const gameQuery = useQuery<GameResponse>();
  const preloadGameQuery = useQuery<GamesResponse>();

  const preloaded = useMemo(() => preloadGameQuery.status === Status.SUCCESS && preloadGameQuery.response.games.length === 1, [preloadGameQuery.status]);

  useEffect(() => {
    socket.on(WebsocketEventType.JOIN, join);
    socket.on(WebsocketEventType.CONNECT, connect);
    return () => {
      socket.off(WebsocketEventType.JOIN);
      socket.off(WebsocketEventType.CONNECT);
    }
  }, []);

  useEffect(() => {
    switch (createGameQuery.status) {
      case Status.SUCCESS:
        setToken(createGameQuery.response.token);
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
        socket.emit(WebsocketEventType.CONNECT, { token } as WebsocketConnectClientToServerEvent);
        break;
      case Status.ERROR:
        console.error('Could not get game :', gameQuery.errorResponse.errors);
        break;
    }
  }, [gameQuery.status]);

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

  const join = (data: WebsocketJoinServerToClientEvent) => {

  }

  const connect = (data: WebsocketConnectServerToClientEvent) => {
    console.log(data);
  }

  const handleCreateGame = () => {
    createGameQuery.post(`${Config.API_URL}/games`, {
      author: 'test' // TODO Add author name
    });
  }

  const handlePreloadGame = (code: string) => {
    preloadGameQuery.get(`${Config.API_URL}/games?code=${code}`);
  }
  
  return (
    <div className="flex flex-col px-4">
    {game == null &&
      <>
        <div className="flex flex-row justify-between">
            <Button variant="primary" onClick={handleCreateGame}>Create new game</Button>
            <span className="text-xl font-bold">OR</span>
            <JoinGameForm preloaded={preloaded} onPreload={handlePreloadGame} />
        </div>
        <div className="my-4">
          <GameInfo game={preloadGameQuery?.response?.games[0]} loading={preloadGameQuery.status === Status.IN_PROGRESS} />
        </div>
      </>
    }
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
