export interface ITrialBalanceApiRes {
  status: string;
  statusCode: number;
  data: ITrialBalanceData[];
}

export interface ITrialBalanceData {
  total_debit: string;
  total_credit: string;
  type: string;
  ledger: string;
}

export interface IFormatedData {
  asset: Child;
  liability: Child;
  Purchase: Child;
  Sales: Child;
}

export interface Child {
  total_debit?: string;
  total_credit?: string;
  type?: string;
  ledger?: string;
  children?: Child[];
}
