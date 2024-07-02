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

interface DataItem {
  value: string;
  label: string;
  __isNew__?: boolean;
}

export interface IVehicleAddFormValues {
  party: DataItem;
  registrationNumber: string;
  model: DataItem;
  purchaseRate: string;
  balance: string;
  purchaseDate: string;
  insurance: Blob | null;
  proof: Blob | null;
  rcBook: Blob | null;
  ownership: string;
  brand: DataItem;
  yearOfManufacture: string;
  purchaseAmount: string;
  insuranceDate: string;
  deliveryService: DataItem;
  deliveryAmount: string;
}
