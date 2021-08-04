import React, { lazy, Suspense } from 'react';

interface Opts {
  fallback: React.ReactNode;
}
type Unpromisify<T> = T extends Promise<infer P> ? P : never;

/**
 *
 * Asynchronously loads the component
 *
 * @example
 * export const HomePage = lazyLoad(() => import('./index'),
 *  module => module.HomePage,
 *   {
 *     fallback: <div>Loading...</div>,
 *   }
 *  );
 *
 */
export const lazyLoad = <
  T extends Promise<any>,
  U extends React.ComponentType<any>,
>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => U,
  { fallback }: Opts = { fallback: null },
) => {
  let lazyFactory: () => Promise<{ default: U }> = importFunc;

  if (selectorFunc) {
    lazyFactory = () =>
      importFunc().then((module) => ({
        default: selectorFunc(module),
      }));
  }

  const LazyComponent = lazy(lazyFactory);

  return (props: React.ComponentProps<U>): JSX.Element => (
    <Suspense fallback={fallback!}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
