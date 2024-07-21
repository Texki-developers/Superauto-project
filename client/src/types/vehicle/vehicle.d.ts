export interface IListVehicle {
  inventory_id: number;
  account_id: number;
  brand_model_id: number;
  ownership_name: string;
  insurance_date: string;
  date_of_purchase: string;
  registration_number: string;
  rc_book: number;
  insurance_doc: number;
  proof_doc: number;
  Account: Account;
}

interface Account {
  name: string;
  contact_info: string;
  head: number;
}