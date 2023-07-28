import { useRoutes } from "react-router-dom";

import MainRoutes from "./MainRoutes";
import LoginRoutes from "./LoginRoutes";
import ErrorPage from './404';

const ErrorRoutes = {
  path: '*',
  element: < ErrorPage />,

};


export default function Routes() {
  return useRoutes([ MainRoutes, LoginRoutes, ErrorRoutes])
}