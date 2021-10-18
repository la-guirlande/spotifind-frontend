import { createContext, FC, useEffect, useMemo } from 'react';
import io, { Socket } from 'socket.io-client';
import { Config } from '../util/configuration';
import { WebsocketEventType } from '../util/data-types';

/**
 * Websocket context state.
 */
 export type WebsocketContextState = {
  socket: Socket;
}

/**
 * Websocket context.
 * 
 * This context is used to access websocket.
 */
export const WebsocketContext = createContext<WebsocketContextState>({ socket: null });

export const WebsocketContextProvider: FC = (props) => {
  const socket = useMemo(() => io(Config.WEBSOCKET_URL), []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      socket.on(WebsocketEventType.TEST, console.debug);
    }
    return () => {
      if (process.env.NODE_ENV === 'development') {
        socket.off(WebsocketEventType.TEST);
      }
    }
  }, []);

  return <WebsocketContext.Provider value={{ socket }}>{props.children}</WebsocketContext.Provider>;
}
