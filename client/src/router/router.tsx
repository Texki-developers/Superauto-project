import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './not-found';
import DashboardLayout from '../layouts/dashboardLayout/DashboardLayout';
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
// import { createBrowserRouter } from 'react-router-dom';
// import ErrorPage from './not-found';
// import DashboardLayout from '../layouts/dashboardLayout/DashboardLayout';
// import { ISidebarItem } from '../types/sidebar/sidebar';
// import sidebarData from '../config/sidebar.data';
// import React from 'react';

// const generateRoutes = (sidebarItems: ISidebarItem[]): { url: string, element: React.ReactNode }[] => {
//   return sidebarItems.flatMap((item) => {
//     const baseItem = { url: item?.url, element: item?.element }
//     const children = item?.isSubMenu && item?.children ? generateRoutes(item?.children) : []
//     return [baseItem, ...children]
//   })
// };

// console.log(generateRoutes(sidebarData))

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <DashboardLayout />,
//     errorElement: <ErrorPage />,
//     children: generateRoutes(sidebarData),
//   },
// ]);


