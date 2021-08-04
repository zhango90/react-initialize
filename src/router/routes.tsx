import { Home } from 'pages/Home/AsyncHome';
import { About } from 'pages/About/AsyncAbout';
import { UserBadge } from 'domains/user/components/UserBadge';
import { IRoute } from './types';
// This is the configuration file for all the routes present in the application
// path are relative path
export default [
  { path: '/', key: 'HOME', exact: true, component: Home },
  {
    path: '/app',
    key: 'APP',
    routes: [
      {
        path: '/',
        key: 'APP_ROOT',
        exact: true,
        component: About,
      },
      {
        path: '/user',
        key: 'USER',
        exact: true,
        component: UserBadge,
      },
    ],
  },
] as IRoute[];
