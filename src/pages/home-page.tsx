import { FC } from 'react';
import { Sidebar } from '../components/sidebar';
import { MainView } from '../views/main-view';
import { Footer } from './footer';

/**
 * Home page component.
 */
export const HomePage: FC = () => (
  <div className="h-screen">
    <div className="h-full grid grid-rows-3 grid-cols-1 md:grid-cols-5 lg:grid-cols-9 auto-cols-max justify-items-stretch">
      <div className="hidden md:inline row-span-full bg-white dark:bg-black">
        <Sidebar />
      </div>
      <div className="row-span-full col-span-3 lg:col-span-6 bg-gray-100 dark:bg-gray-900">
        <MainView />
      </div>
      <div className="hidden md:block row-span-full lg:col-span-2 bg-white dark:bg-black">
        Right view
      </div>
    </div>
    <Footer className="" />
  </div>
);
