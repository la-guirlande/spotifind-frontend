import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticationContextProvider } from './contexts/authentication-context';
import { WebsocketContextProvider } from './contexts/websocket-context';
import { Router } from './router';

/**
 * Application component.
 * 
 * This component is the entry point of the website.
 */
export const App: FC = () => (
    <BrowserRouter>
        <AuthenticationContextProvider>
            <WebsocketContextProvider>
                <Router />
            </WebsocketContextProvider>
        </AuthenticationContextProvider>
    </BrowserRouter>
);
