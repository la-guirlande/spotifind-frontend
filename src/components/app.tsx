import { FC } from 'react';
import { AuthenticationContextProvider } from './contexts/authentication-context';

export const App: FC = () => (
  <AuthenticationContextProvider>
    <p>Hello World</p>
  </AuthenticationContextProvider>
);
