import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import { WebsocketContext } from '../contexts/websocket-context';
import { Config } from '../util/configuration';
import { GameData, WebsocketConnectClientToServerEvent, WebsocketConnectServerToClientEvent, WebsocketEventType, WebsocketJoinClientToServerEvent, WebsocketJoinServerToClientEvent, WebsocketLeaveClientToServerEvent, WebsocketLeaveServerToClientEvent, WebsocketStartClientToServerEvent, WebsocketStartServerToClientEvent } from '../util/data-types';
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
  leave: () => void;
  start: () => void;
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
  const { authUser } = useContext(AuthenticationContext);
  const { socket } = useContext(WebsocketContext);
  const [token, setToken] = useState<string>(gameToken);
  const createGameQuery = useQuery<GameCreationResponse>();
  const [game, setGame] = useState<GameData>(null);

  useEffect(() => {
    socket.on(WebsocketEventType.ERROR, console.error);
    socket.on(WebsocketEventType.JOIN, (data: WebsocketJoinServerToClientEvent) => setToken(data.token));
    socket.on(WebsocketEventType.LEAVE, (data: WebsocketLeaveServerToClientEvent) => setGame(data.game));
    socket.on(WebsocketEventType.CONNECT, (data: WebsocketConnectServerToClientEvent) => setGame(data.game));
    socket.on(WebsocketEventType.START, (data: WebsocketStartServerToClientEvent) => setGame(data.game));
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
      name: authUser.display_name
    } as WebsocketJoinClientToServerEvent);
  }

  const leave = () => {
    socket.emit(WebsocketEventType.LEAVE, { token } as WebsocketLeaveClientToServerEvent);
  }

  const connect = () => {
    socket.emit(WebsocketEventType.CONNECT, { token } as WebsocketConnectClientToServerEvent);
  }

  const start = () => {
    socket.emit(WebsocketEventType.START, { token } as WebsocketStartClientToServerEvent);
  }

  return { game, token, createGameQuery, create, join, leave, start };
}
