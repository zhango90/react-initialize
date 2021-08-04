import { Home } from 'pages/Home/AsyncHome';
import { About } from 'pages/About/AsyncAbout';
import { IRoute } from './types';
// This is the configuration file for all the routes present in the application
export const ROUTES: IRoute[] = [
  { path: '/', key: 'HOME', exact: true, component: Home },
  {
    path: '/dashboard',
    key: 'APP',
    routes: [
      {
        path: '/about',
        key: 'APP_ROOT',
        exact: true,
        component: About,
      },
      {
        path: '/app/page',
        key: 'APP_PAGE',
        exact: true,
        component: () => <h1>App Page</h1>,
      },
    ],
  },
];
