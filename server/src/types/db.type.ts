const fileUpload = require("express-fileupload")
import { E_ACCOUNT_CATEGORIES } from "../utils/constants/constants";

interface IAccountAttributes {
    account_id?: number;
    name: string;
    contact_info: string;
    category: E_ACCOUNT_CATEGORIES;
    head?: number;
  }


  interface IEmployeeAttributes { 
      salary: number;
      employee_id?:number;
      account_id?:number;
  }


  interface IInventoryAttributes {
    inventory_id?: number;
    account_id:number;
    brand_model_id: number;
    year_of_manufacture: number;
    registration_number:string;
    ownership_name: string;
    purchase_rate: number;
    insurance_date: string | null;
    sale_status: boolean;
    rc_book: typeof fileUpload
    insurance_doc: typeof fileUpload
    proof_doc: typeof fileUpload
    date_of_purchase: string | null;
    sold_price?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
  }


  interface ITransactionParams{
    amount:number;
    credit_account:number;
    debit_account:number
}


interface IDeliveryAttributes {
  delivery_service : string
  delivery_amount: number
}



export {
    IAccountAttributes,
    IEmployeeAttributes,
    IInventoryAttributes,
    IDeliveryAttributes,
    ITransactionParams
}