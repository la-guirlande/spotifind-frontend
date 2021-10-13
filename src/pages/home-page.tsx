import { FC } from 'react';
import { Sidebar } from '../components/sidebar';

/**
 * Home page component.
 */
export const HomePage: FC = () => (
  <div className="h-screen grid grid-rows-2 grid-cols-1 md:grid-cols-3 justify-items-stretch">
    <div className="hidden md:inline">
      <Sidebar />
    </div>
    <div>
      Main view
    </div>
    <div className="hidden md:block">
      Right view
    </div>
    <div className="md:col-span-3">
      Down view
    </div>
  </div>
);
