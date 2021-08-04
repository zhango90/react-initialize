import { lazyLoad } from 'shared/services/lazy-load';

export const About = lazyLoad(
  () => import('./index'),
  (module) => module.About,
);
