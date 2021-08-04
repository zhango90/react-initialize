export interface IRoute {
  path: string;
  key: string;
  exact?: boolean;
  component?: ({ routes }: { routes?: IRoute[] }) => JSX.Element;
  routes?: IRoute[];
}
