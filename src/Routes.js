import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import App from './App';
import { Registration } from './component/Registration';
import NotFound from './pages/NotFound';
import { useRoutes } from "react-router-dom";

import MainNavigation from './components/navigation-menu/MainNavigation.jsx'
import { Box } from '@mui/material';
import Dashboard from './pages/Dashboard';
import Cars from './pages/Cars';
import CarCategories from './pages/CarCategories';

function Routes() {

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
    <div className="App">
    {element}
    </div>
  );
}

export default Routes;
