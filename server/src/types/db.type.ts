const fileUpload = require('express-fileupload');
import { E_ACCOUNT_CATEGORIES } from '../utils/constants/constants';

interface IAccountAttributes {
  account_id?: number;
  name: string;
  contact_info: string;
  category: E_ACCOUNT_CATEGORIES;
  head?: number;
}

interface IEmployeeAttributes {
  salary: number;
  employee_id?: number;
  account_id?: number;
}

interface IInventoryAttributes {
  inventory_id?: number;
  account_id: number;
  brand_model_id: number;
  year_of_manufacture: number;
  registration_number: string;
  ownership_name: string;
  purchase_rate: number;
  insurance_date: string | null;
  sale_status: boolean;
  rc_book: typeof fileUpload;
  insurance_doc: typeof fileUpload;
  proof_doc: typeof fileUpload;
  date_of_purchase: Date;
  sold_price?: number | null;
}

interface ITransactionParams {
  amount: number;
  credit_account: number;
  debit_account: number;
  description?: string;
  voucher_id?: string;
  transaction_date:Date
}

interface IDeliveryAttributes {
  delivery_service: number;
  delivery_amount: number;
}

interface IFinancerTransactionAttributes {
  financer_transaction_id?: number;
  financer_id: number;
  vehicle_id: number;
  createdAt?: Date;
  transaction_id: number;
  updatedAt?: Date;
}

interface IDsTransactionAttributes {
  ds_txn_id?: number;
  ds_id: number;
  vehicle_id: number;
  transaction_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IServiceTransactionAttributes {
  service_txn_id?: number;
  service_shop_id: number;
  transaction_id: number;
  vehicle_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ISalesAttributes {
  sales_id?: number;
  account_id: number;
  sold_vehicle: number;
  sold_rate: number;
  sold_date: Date;
  payment_mode: string;
  is_finance: boolean;
  finance_amount?: number;
  finance_service_charge?: number;
  is_exchange: boolean;
  exchange_vehicle_id?: number;
  due_date: Date;
}

interface ISaleReturnAttributes {
  sl_id: number;
  inventory_id: number;
  sold_price?: number;
  sale_status: boolean;
  purchase_rate: number;
  date_of_purchase: Date;
}

export {
  IAccountAttributes,
  IEmployeeAttributes,
  IInventoryAttributes,
  IDeliveryAttributes,
  ITransactionParams,
  IFinancerTransactionAttributes,
  IDsTransactionAttributes,
  IServiceTransactionAttributes,
  ISalesAttributes,
  ISaleReturnAttributes
};
