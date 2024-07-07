// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import DashboardImage from '../assets/sidebar-icons/dashboardicon.svg';
import VehiclesImage from '../assets/sidebar-icons/vehiclesicon.svg';
import FinanceImage from '../assets/sidebar-icons/financeicon.svg';
import ServiceShopImage from '../assets/sidebar-icons/service.svg';
import CustomersImage from '../assets/sidebar-icons/customericon.svg';
import EmployeesImage from '../assets/sidebar-icons/employeesicon.svg';
import DeliveryImage from '../assets/sidebar-icons/deliveryicon.svg';
import AllReportsImage from '../assets/sidebar-icons/allreportsicon.svg';
import { ISidebarItem } from '../types/sidebar/sidebar';
import Dashboard from '../pages/dashboard/Dashboard';
import Vehicles from '../pages/vehicles/Vehicles';
import Finance from '../pages/finance/Finance';
import ServiceShop from '../pages/serviceShop/ServiceShop';
import Customers from '../pages/customers/Customers';
import Employees from '../pages/employees/Employees';
import DeliveryServices from '../pages/deliveryServices/DeliveryServices';
import DailyBook from '../pages/reports/dailyBook/DailyBook';
import Ledger from '../pages/reports/ledger/Ledger';
import CashBook from '../pages/reports/cashbook/Cashbook';
import TrailBalance from '../pages/reports/trailBalance/TrailBalance';
import BalanceSheet from '../pages/reports/balanceSheet/BalanceSheet';
import ProfitAndLoss from '../pages/reports/profitAndLoss/ProfitAndLoss';

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
    element: <Customers />,
  },
  {
    name: 'Employees',
    url: '/employees',
    icon: EmployeesImage,
    id: uuidv4(),
    isSubMenu: false,
    element: <Employees />,
  },
  // {
  //   name: 'Other Expenses',
  //   url: '/other-expenses',
  //   icon: OtherExpensesImage,
  //   id: uuidv4(),
  //   isSubMenu: false,
  //   element: <OtherExpenses />,
  // },
  {
    name: 'Delivery Services',
    url: '/delivery-services',
    icon: DeliveryImage,
    id: uuidv4(),
    isSubMenu: false,
    element: <DeliveryServices />,
  },
  {
    name: 'All Reports',
    url: '/all-reports',
    icon: AllReportsImage,
    id: uuidv4(),
    isSubMenu: true,
    children: [
      {
        name: 'Daily Book',
        url: '/all-reports/daily-book',
        id: uuidv4() + 2,
        isSubMenu: false,
        element: <DailyBook key='dailybook' />,
      },
      {
        name: 'Ledger',
        url: '/all-reports/ledger',
        id: uuidv4() + 3,
        isSubMenu: false,
        element: <Ledger />,
      }
      , {
        name: 'Cash Book',
        url: '/all-reports/cash-book',
        id: uuidv4() + 4,
        isSubMenu: false,
        element: <CashBook />,
      },
      {
        name: 'Trial Balance',
        url: '/all-reports/trial-balance',
        id: uuidv4() + 4,
        isSubMenu: false,
        element: <TrailBalance />,
      },
      {
        name: 'Balance Sheet',
        url: '/all-reports/balance-sheet',
        id: uuidv4() + 4,
        isSubMenu: false,
        element: <BalanceSheet />,
      },
      {
        name: 'Profi & Loss',
        url: '/all-reports/profit-loss',
        id: uuidv4() + 4,
        isSubMenu: false,
        element: <ProfitAndLoss />,
      }
    ]
  },
];

export default sidebarData;
