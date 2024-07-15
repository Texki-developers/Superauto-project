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
