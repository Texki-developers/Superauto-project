export interface IVehicleSellFormValues {
  customer: string;
  saleRate: string;
  mrp: string;
  salesDate: string;
  paymentType: string;
  financeAmount: string;
  financeServiceCharge: string;
  registrationNumber: string;
  rate: string;
  paymentAmount: string;
  dueDate: string;
  balance: string;
}

export interface IVehicleNewFormValues {
  registrationNumber: string;
  value: string;
}


interface ISellVehicleApiBody {
  accountId: string;
  soldRate: string;
  soldDate: string;
  paymentMode: string;
  financeAmound: string;
  financeCharge: string;
  regNum: string;
  soldVehicleId: string;
  isFinance: boolean;
  is_exchange: boolean;
  rate: string;
  amount: string;
  due_date: string;
}
