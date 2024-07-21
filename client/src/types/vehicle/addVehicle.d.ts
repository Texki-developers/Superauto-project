// export interface IVehicleAddFormValues {
//   party: string;
//   registrationNumber: string;
//   model: string;
//   purchaseRate: string;
//   rcBook: Blob | null;
//   balance: string;
//   purchaseDate: string;
//   ownership: string;
//   brand: string;
//   yearOfManufacture: number;
//   purchaseAmount: string;
//   insuranceDate: string;
//   insurance: Blob | null;
//   proof: Blob | null;
//   deliveryService: string;
//   deliveryAmount: string;
// }

export interface DataItem {
  value: string;
  label: string;
  __isNew__?: boolean;
}

export interface IEditVehicleData {
  inventory_id: number;
  account_id: number;
  brand_model_id: number;
  ownership_name: string;
  insurance_date: string;
  date_of_purchase: string;
  purchase_rate: number;
  year_of_manufacture: number;
  BrandModel: BrandModel;
  rcBook: null;
  insuranceDoc: null;
  proofDoc: null;
}

interface BrandModel {
  brand: string;
  model: string;
}

export interface IVehicleAddFormValues {
  party: DataItem;
  registrationNumber: string;
  model: DataItem;
  purchaseRate: string;
  partyPhoneNumber: string;
  balance: string;
  purchaseDate: string;
  insurance: Blob | null;
  proof: Blob | null;
  rcBook: Blob | null;
  ownership: string;
  brand: DataItem;
  yearOfManufacture: string;
  purchaseAmount: string;
  deliveryServicePhoneNumber: string;
  insuranceDate: string;
  deliveryService: DataItem;
  deliveryAmount: string;
}

export interface IBranAndModel {
  brand_model_id: number;
  brand: string;
  model: string;
}
