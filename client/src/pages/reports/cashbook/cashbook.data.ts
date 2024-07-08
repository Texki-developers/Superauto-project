import { ITableColumn } from '../../../types/table/table';

export const ColumnData: ITableColumn[] = [
  { name: 'Date', key: 'date' },
  { name: '#', key: 'voucherid' },
  { name: 'Note', key: 'description' },
  { name: 'Debit(₹)', key: 'debit' },
  { name: 'Credit(₹)', key: 'credit' },
  { name: 'Balance', key: 'closingbalance' },
];
