export const paymentTypes: IOption[] = [
  { label: 'Cash', value: 1 },
  { label: 'Bank', value: 2 },
];

export interface IOption {
  label: string;
  value: string | number;
}
