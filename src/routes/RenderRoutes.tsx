import { Route, Switch } from 'react-router-dom';
import { ROUTES } from './config';
import RouteWithSubRoutes from './RouteWIthSubRoutes';
import { IRoute } from './types';

interface IProps {
  routes?: IRoute[];
}
/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export const RenderRoutes = ({ routes = ROUTES }: IProps) => {
  return (
    <Switch>
      {routes.map((route) => {
        return <RouteWithSubRoutes {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
};
