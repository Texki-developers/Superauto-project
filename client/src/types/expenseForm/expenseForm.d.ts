export interface IAllDropDownData {
  account_id: string;
  name: string;
}
export interface IExpenseFormData {
  expenseTo: IAllDropDownData | null;
  description: string;
  date: string;
  amount: number | null;
}

export interface IExpenseApiBody extends IExpenseApiBoduData {
  expenseTo: string;
}

interface IExpenseApiResData {
  status: string;
  statusCode: number;
  message: string;
}
