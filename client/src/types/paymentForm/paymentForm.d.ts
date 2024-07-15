export interface IFormData {
  paymentTo: { [key: string]: string };
  paymentFrom: { [key: string]: string };
  phoneNumber?: string;
  description: string;
  date: string;
  amount: number | null; 
}

export interface IPaymentBodyData {
  paymentFrom: string;
  paymentTo: number;
  description: string;
  date: string;
  amount: number | null;
}

export interface IPaymentResData {
  status: string;
  statusCode: number;
  message: string;
}
