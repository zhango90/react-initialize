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
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => <Component {...props} routes={routes} />}
    />
  );
};

export default RouteWithSubRoutes;
