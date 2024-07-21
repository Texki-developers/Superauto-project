export interface IListAccountData {
  account_id: number;
  name: string;
  contact_info: string;
  category: string;
  createdAt: string;
  Employee?: {
    salary: number;
  };
}
