import { IHeaderDataMap } from '../types/breadCrumb/breadCrumb';

export const headersData: IHeaderDataMap = {
  '/': {
    title: 'Dashboard',
    breadCrumb: [{ name: 'Dashboard', link: '/' }],
  },
  vehicles: {
    title: 'Vehicles',
    breadCrumb: [{ name: 'Dashboard', link: '/' }, { name: 'Vehicles' }],
  },
  sales: {
    title: 'Sales',
    breadCrumb: [{ name: 'Dashboard', link: '/' }, { name: 'Sales' }],
  },
  finance: {
    title: 'Finance',
    breadCrumb: [{ name: 'Dashboard', link: '/' }, { name: 'Finance' }],
  },
  'service-shop': {
    title: 'Service Shop',
    breadCrumb: [{ name: 'Dashboard', link: '/' }, { name: 'Service Shop' }],
  },
  customers: {
    title: 'Customers',
    breadCrumb: [{ name: 'Dashboard', link: '/' }, { name: 'Customers' }],
  },
  employees: {
    title: 'Employees',
    breadCrumb: [{ name: 'Dashboard', link: '/' }, { name: 'Employees' }],
  },
  'other-expenses': {
    title: 'Other Expenses',
    breadCrumb: [{ name: 'Dashboard', link: '/' }, { name: 'Other Expenses' }],
  },
  'delivery-services': {
    title: 'Delivery Services',
    breadCrumb: [
      { name: 'Dashboard', link: '/' },
      { name: 'Delivery Services' },
    ],
  },
};
