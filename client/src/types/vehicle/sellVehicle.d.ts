interface DataItem {
  value: string;
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
  Inventory: Inventory;
}

interface Inventory {
  registration_number: string;
  inventory_id: number;
}
