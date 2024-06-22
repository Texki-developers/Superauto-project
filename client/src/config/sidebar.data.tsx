import { v4 as uuidv4 } from 'uuid';
import DashboardImage from '../assets/sidebar-icons/dashboardicon.svg';
import VehiclesImage from '../assets/sidebar-icons/vehiclesicon.svg';
import FinanceImage from '../assets/sidebar-icons/financeicon.svg';
import ServiceShopImage from '../assets/sidebar-icons/service.svg';
import CustomersImage from '../assets/sidebar-icons/customericon.svg';
import EmployeesImage from '../assets/sidebar-icons/employeesicon.svg';
import OtherExpensesImage from '../assets/sidebar-icons/otherexpensesicon.svg';
import DeliveryImage from '../assets/sidebar-icons/deliveryicon.svg';
import AllReportsImage from '../assets/sidebar-icons/allreportsicon.svg';
import { ISidebarItem } from '../types/sidebar/sidebar';
import Dashboard from '../pages/dashboard/Dashboard';
import Vehicles from '../pages/vehicles/Vehicles';
import Finance from '../pages/finance/Finance';
import ServiceShop from '../pages/serviceShop/ServiceShop';

export const sidebarData: ISidebarItem[] = [
  {
    name: 'Dashboard',
    url: '/',
    icon: DashboardImage,
    id: uuidv4(),
    isSubMenu: false,
    element: <Dashboard />,
  },
  {
    name: 'Vehicles',
    url: '/vehicles',
    icon: VehiclesImage,
    id: uuidv4(),
    isSubMenu: false,
    element: <Vehicles />,
  },
  {
    name: 'Finance',
    url: '/finance',
    icon: FinanceImage,
    id: uuidv4(),
    isSubMenu: false,
    element: <Finance />,
  },
  {
    name: 'Service Shop',
    url: '/service-shop',
    icon: ServiceShopImage,
    id: uuidv4(),
    isSubMenu: false,
    element: <ServiceShop />,
  },
  {
    name: 'Customers',
    url: '/customers',
    icon: CustomersImage,
    id: uuidv4(),
    isSubMenu: false,
    element: <Dashboard />,
  },
  {
    name: 'Employees',
    url: '/employees',
    icon: EmployeesImage,
    id: uuidv4(),
    isSubMenu: false,
    element: <Dashboard />,
  },
  {
    name: 'Other Expenses',
    url: '/other-expenses',
    icon: OtherExpensesImage,
    id: uuidv4(),
    isSubMenu: false,
    element: <Dashboard />,
  },
  {
    name: 'Delivery Services',
    url: '/delivery-services',
    icon: DeliveryImage,
    id: uuidv4(),
    isSubMenu: false,
    element: <Dashboard />,
  },
  {
    name: 'All Reports',
    url: '/all-reports',
    icon: AllReportsImage,
    id: uuidv4(),
    isSubMenu: false,
    element: <Dashboard />,
  },
];

export default sidebarData;
