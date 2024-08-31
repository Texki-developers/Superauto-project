export const paymentTypes: IOption[] = [
  { label: 'Cash', value: 1 },
  { label: 'Bank', value: 2 },
];

export const paymentObj: { [key: string]: number } = {
  Cash: 1,
  Bank: 2,
};

export const paymentTypesWithName: IOption[] = [
  { label: 'Cash', value: 'CASH' },
  { label: 'Bank', value: 'BANK' },
];

export interface IOption {
  label: string;
  value: string | number;
}
