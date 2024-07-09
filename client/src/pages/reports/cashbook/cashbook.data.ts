import { ITableColumn } from '../../../types/table/table';

export const ColumnData: ITableColumn[] = [
  { name: 'Date', key: 'date' },
  { name: '#', key: 'voucherid' },
  { name: 'Note', key: 'description' },
  { name: 'Debit(₹)', key: 'debit', textAlign: 'text-start' },
  { name: 'Credit(₹)', key: 'credit', textAlign: 'text-start' },
  {
    name: 'Balance',
    key: 'runningbalance',
    align: 'justify-items-end',
    textAlign: 'text-end',
  },
];
