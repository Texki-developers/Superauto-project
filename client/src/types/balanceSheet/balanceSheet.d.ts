export interface IBalanceSheetApiRes {
  data: IBalanceSheetData[];
}
export interface IBalanceSheetData {
  account_type: null | number;
  balance: string;
  category: string;
  ledger: string;
}

export interface IFormattedBalanceSheet {
  asset: IChild;
  liability: IChild;
  equity: IChild;
}

interface IChild {
  children?: children[] | [];
  balance: number;
}

interface children {
  account_type: number;
  balance: string;
  category: string;
  ledger: string;
}
