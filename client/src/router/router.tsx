import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './not-found';
import DashboardLayout from '../layouts/dashboardLayout/dashboardLayout';
import { ISidebarItem } from '../types/sidebar/sidebar';
import sidebarData from '../config/sidebar.data';

const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.map((item) => ({
    path: item.url,
    element: item?.element,
  }));
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: generateRoutes(sidebarData),
  },
]);
