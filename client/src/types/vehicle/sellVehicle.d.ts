interface DataItem {
  value: string | number;
  label: string;
  __isNew__?: boolean;
}

export interface IVehicleSellFormValues {
  customer: DataItem;
  saleRate: string;
  mrp: string;
  salesDate: string;
  paymentType: DataItem;
  financeAmount: string;
  customerPhoneNumber: string;
  financeServiceCharge: string;
  registrationNumber: string;
  rate: number | null;
  paymentAmount: string;
  dueDate: string;
  balance: string;
}

export interface ISalesEdit {
  data: ISalesData;
}
export interface ISalesData {
  sales_id: number;
  account_id: number;
  sold_vehicle: number;
  sold_rate: number | string;
  sold_date: string;
  payment_mode: string;
  is_finance: boolean;
  finance_amount: null;
  finance_service_charge: null;
  is_exchange: boolean;
  exchange_vehicle_id: null;
  due_date: string;
  createdAt: string;
  updatedAt: string;
  amount: string | undefined;
  accounts: Accounts;
}

interface Accounts {
  name: string;
  account_id: number;
}

export interface IVehicleNewFormValues {
  registrationNumber: DataItem;
  value: string;
  purchaseDate: string;
}

interface ISellVehicleApiBody {
  accountId: string;
  soldRate: string;
  soldDate: string;
  paymentMode: string;
  financeAmound: string;
  exchangeVehicleId: string;
  financeCharge: string;
  regNum: string;
  soldVehicleId: string;
  isFinance: boolean;
  is_exchange: boolean;
  rate: string;
  amount: string;
  due_date: string;
}

export interface IExchangeVehicleDetails {
  id: number;
  rate: number;
  regNumb: string;
}

export interface IGetSalesLIST {
  data: IGetSales[];
}
export interface IGetSales {
  sold_rate: number;
  sales_id: number;
  account_id: number;
  Inventory: Inventory;
}

interface Inventory {
  registration_number: string;
  inventory_id: number;
}
