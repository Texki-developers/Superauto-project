import { ITableColumn } from '../../../types/table/table';

export const ColumnData: ITableColumn[] = [
  { name: 'S.No',index:true },
  { name: 'Date', key: 'transaction_date' },
  {
    name: 'Voucher',
    key: 'voucher_id',
    columnData: (item: string) => {
      return (<p className='text-primary-300'>{item}</p>);
    },
  },
  {
    name: 'Dr. Account',
    key: 'DebitAccount',
    columnData: (item: { name: string }) => {
      return item?.name;
    },
  },
  {
    name: 'Cr. Account',
    key: 'CreditAccount',
    columnData: (item: { name: string }) => {
      return item?.name;
    },
  },
  { name: 'Amount(₹)', key: 'amount' },
];
