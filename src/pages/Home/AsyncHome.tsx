import { lazyLoad } from 'shared/services/lazy-load';

export const Home = lazyLoad(
  () => import('./index'),
  (module) => module.Home,
);
