export interface IBalanceSheetApiRes {
  data: IBalanceSheetData[];
}
export interface IBalanceSheetData {
  Total: any;
  name: string;
  account_type: null | number;
  balance: string;
  category: string;
  ledger: string;
}

export interface IFormattedBalanceSheet {
  asset: IChild;
  liability: IChild;
  capitalAc:IChild;
  equity: IChild;
  total_profit: IChild;
}

interface IChild {
  children?: children[] | [];
  balance: number;
  total?: number;
}

interface children {
  account_type: number;
  balance: string;
  category: string;
  ledger: string;
}
