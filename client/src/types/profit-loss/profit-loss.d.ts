export interface IProfitLossApiRes {
  status: string;
  statusCode: number;
  data: IPofitLossData[];
}

export interface IPofitLossData {
  account_id: null;
  name: string;
  Total: null | string;
}