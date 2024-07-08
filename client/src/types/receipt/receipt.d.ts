export interface IFormData {
  paymentTo: { [key: string]: string };
  paymentFrom: { [key: string]: string };
  phoneNumber?: string;
  description: string;
  date: string;
  amount: number | null;
}

export interface IReceiptBodyData {
  paymentFrom: number;
  paymentTo: string;
  description: string;
  date: string;
  amount: number | null;
}

export interface IReceiptResData {
  status: string;
  statusCode: number;
  message: string;
}
