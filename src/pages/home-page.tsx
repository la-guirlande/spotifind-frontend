import { FC } from 'react';
import { Sidebar } from '../components/sidebar';
import { MainView } from '../views/main-view';

/**
 * Home page component.
 */
export const HomePage: FC = () => (
  <div className="h-screen grid grid-rows-3 grid-cols-1 md:grid-cols-5 auto-cols-max justify-items-stretch">
    <div className="hidden md:inline row-span-2 bg-white dark:bg-black">
      <Sidebar />
    </div>
    <div className="row-span-2 col-span-3 bg-gray-300 dark:bg-gray-700">
      <MainView />
    </div>
    <div className="hidden md:block row-span-2 bg-white dark:bg-black">
      Right view
    </div>
    <div className="col-span-full">
      Down view
    </div>
  </div>
);
