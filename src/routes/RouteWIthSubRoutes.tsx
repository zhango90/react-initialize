import { Route } from 'react-router-dom';
import { RenderRoutes } from 'routes';
import { IRoute } from './types';

const RouteWithSubRoutes = ({
  component,
  routes,
  path,
  exact,
}: IRoute) => {
  const Component = component || RenderRoutes;
  const generateAbsPath = (relativePath: string) => {
    return path + relativePath;
  };
  const castedRoutes = routes?.map((el) => {
    return {
      ...el,
      path: generateAbsPath(el.path),
    };
  });
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => (
        <Component {...props} routes={castedRoutes} />
      )}
    />
  );
};

export default RouteWithSubRoutes;
