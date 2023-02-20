import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import MainNavigation from './component/navigation-menu/MainNavigation.jsx'
import { useRoutes } from "react-router-dom";
import { Box } from '@mui/material';

import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Cars from './pages/Cars';
import CarCategories from './pages/CarCategories';


export default function Home() {
    let element = useRoutes([
        {
          path: "/",
          element: <Dashboard />
        },
        {
          path: "/cars",
          element: <Cars />
        },
        {
          path: "/car_categories",
          element: <CarCategories />
        },
        {
          path: "/*",
          element: <NotFound />
        }
      ])

    return (
        <div>
      <MainNavigation />
  
      <Box sx={{ p:2 }}>
        {element}
      </Box>
    </div>
    )

    
}