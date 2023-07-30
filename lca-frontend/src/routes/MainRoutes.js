// to split the bundle and dynamically load third components or third party libraries
// import { lazy } from "react"; 

import MainLayout from '../layout/MainLayout';
import ProductOverview from "../pages/product-footprint/overview";
import ProductDetail from "../pages/product-footprint/detail/index";
import FactorDetail from '../pages/product-footprint/factor_detail';
import OrganizationOverview from "../pages/organization-carbon-footprint";
import LCAnote from '../pages/LCA-note';
import Factor_db from '../pages/factor_db';
import Home from '../pages/home'
import Efootprint from '../pages/efootprint'
import ESG from '../pages/ESG'
import Training from '../pages/training'


const MainRoutes = 
  {
    path: '/',
    auth: false,
    element: <MainLayout />,
    children: [
      {
        path: '/',
        auth: false,
        element : <Home/>,
      },
      {
        path: '/factor_db',
        auth: true,
        element: <Factor_db />,
      },
      {
        path: '/efootprint',
        auth: true,
        element: <Efootprint />,
      },
      {
        path: '/training',
        auth: true,
        element: <Training />,
      },
      {
        path: '/LCA',
        auth: true,
        element: <ProductOverview />,
      },
      {
        path: '/product-detail',
        auth: true,
        element : <ProductDetail />
      },
      {
        path: '/factor-detail/:index',
        auth: true,
        element : <FactorDetail />
      },

      {
        path: '/organization-carbon-footprint',
        auth: true,
        element: <OrganizationOverview />,
      },

      {
        path: '/LCA-note',
        auth: true,
        element: <LCAnote />,
      },
      {
        path: '/ESG',
        auth: true,
        element: <ESG />,
      }
    ]
  }




export default MainRoutes