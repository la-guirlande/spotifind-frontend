import { FC } from 'react';
import { AuthenticationContextProvider } from './contexts/authentication-context';
import { Footer } from './pages/footer';
import { Router } from './router';

/**
 * Application component.
 * 
 * This component is the entry point of the website.
 */
export const App: FC = () => (
  <AuthenticationContextProvider>
    <Router />
    <Footer />
  </AuthenticationContextProvider>
);
