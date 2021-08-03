import { IRoute } from "./types";
import Home from "pages/Home";
// This is the configuration file for all the routes present in the application
export const ROUTES: IRoute[] = [
  { path: "/", key: "HOME", exact: true, component: Home },
  {
    path: "/app",
    key: "APP",
    component: () => <h1>App</h1>,
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>App Index</h1>
      },
      {
        path: "/app/page",
        key: "APP_PAGE",
        exact: true,
        component: () => <h1>App Page</h1>
      }
    ]
  }
];
