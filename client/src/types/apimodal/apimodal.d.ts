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
  id?: string | number;
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

export interface IApiError {
  message: string;
  status: 'error' | 'success';
}

interface IAssignApiBody {
  Vehicles: IVehicle[];
}

interface IVehicle {
  amount: number;
  regNum: string;
  [key: 'financerId' | 'serviceId']: number;
}
