// to split the bundle and dynamically load third components or third party libraries
// import { lazy } from "react"; 

import MainLayout from '../layout/MainLayout';
import ProjectOverview from "../pages/project-footprint/overview";
import ProductDetail from "../pages/project-footprint/detail/index";
import FactorDetail from '../pages/project-footprint/factor_detail';
import OrganizationOverview from "../pages/organization-carbon-footprint";
import WaterOverview from '../pages/water_footprint';
import Home from '../pages/home';
import { Water } from '@mui/icons-material';


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
        path: '/product-carbon-footprint',
        auth: true,
        element: <ProjectOverview />,
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
        path: '/water-footprint',
        auth: true,
        element: <WaterOverview />,
      }
    ]
  }




export default MainRoutes