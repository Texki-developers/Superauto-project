export enum ICategory {
  EMPLOYEE = 'EMPLOYEE',
  SERVICE_SHOP = 'SERVICE_SHOP',
  DELIVERY_SERVICE = 'DELIVERY_SERVICE',
  FINANCER = 'FINANCER',
  BROKER = 'BROKER',
  CUSTOMER = 'CUSTOMER',
}

export interface IAccountApiBody {
  name: string;
  category: ICategory;
  contactInfo: string;
  salary?: number;
}

export interface IAccountApiBodyResponseBody {
  status: string;
  statusCode: number;
  message: string;
  data: Data;
}

export interface IAccountApiResponseData {
  message: string;
}
