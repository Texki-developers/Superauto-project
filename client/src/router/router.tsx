import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './not-found';
import DashboardLayout from '../layouts/dashboardLayout/DashboardLayout';
import { ISidebarItem } from '../types/sidebar/sidebar';
import sidebarData from '../config/sidebar.data';
import LoginPage from '../pages/login/Login';

const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.map((item) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {
      path: item.url,
      element: item?.element,
    }
    if (item.isSubMenu && item?.children) {
      data.children = item.children.map((item) => (
        {
          path: item?.url,
          element: item?.element,
        }
      ))
    }
    return data
  });
};
export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: generateRoutes(sidebarData),
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />
  }
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


