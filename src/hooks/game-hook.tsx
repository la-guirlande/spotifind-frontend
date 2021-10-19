import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from '../contexts/websocket-context';
import { Config } from '../util/configuration';
import { GameData, WebsocketConnectClientToServerEvent, WebsocketConnectServerToClientEvent, WebsocketEventType, WebsocketJoinClientToServerEvent, WebsocketJoinServerToClientEvent } from '../util/data-types';
import { LocalStorageKey } from '../util/local-storage';
import { GameCreationResponse } from '../util/response-types';
import { Query, Status, useQuery } from './query-hook';

/**
 * Game hook values.
 */
export interface GameHook {
  game: GameData;
  token: string;
  createGameQuery: Query<GameCreationResponse>;
  create: (author: string) => void;
  join: (code: string) => void;
}

/**
 * Game hook.
 * 
 * This hook is used to manage games (create, join, connect, ...).
 * 
 * @param gameToken Game token
 * @returns Game hook values
 */
export const useGame = (gameToken?: string): GameHook => {
  const { socket } = useContext(WebsocketContext);
  const [token, setToken] = useState<string>(gameToken);
  const createGameQuery = useQuery<GameCreationResponse>();
  const [game, setGame] = useState<GameData>(null);

  useEffect(() => {
    socket.on(WebsocketEventType.ERROR, console.error);
    socket.on(WebsocketEventType.JOIN, (data: WebsocketJoinServerToClientEvent) => setToken(data.token));
    socket.on(WebsocketEventType.CONNECT, (data: WebsocketConnectServerToClientEvent) => setGame(data.game));
    return () => {
      socket.off(WebsocketEventType.ERROR);
      socket.off(WebsocketEventType.JOIN);
      socket.off(WebsocketEventType.CONNECT);
    }
  }, []);

  useEffect(() => {
    switch (createGameQuery.status) {
      case Status.SUCCESS:
        setToken(createGameQuery.response.token);
        break;
      case Status.ERROR:
        console.error('Could not create game :', createGameQuery.errorResponse.errors);
        break;
    }
  }, [createGameQuery.status]);

  useEffect(() => {
    if (token != null) {
      localStorage.setItem(LocalStorageKey.GAME_TOKEN, token);
      connect();
    }
  }, [token]);

  const create = (author: string) => {
    createGameQuery.post(`${Config.API_URL}/games`, { author });
  }

  const join = (code: string) => {
    socket.emit(WebsocketEventType.JOIN, {
      code,
      name: _.random(0, 1000).toString() // TODO Add author name
    } as WebsocketJoinClientToServerEvent);
  }

  const connect = () => {
    socket.emit(WebsocketEventType.CONNECT, { token } as WebsocketConnectClientToServerEvent);
  }

  return { game, token, createGameQuery, create, join };
}
