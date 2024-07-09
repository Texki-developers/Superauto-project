import moment from 'moment';
import { ITableColumn } from '../../../types/table/table';

export const ColumnData: ITableColumn[] = [
  { name: 'S.No', index: true },
  {
    name: 'Date', key: 'transaction_date', columnData: (item: string) => {
      return <p>{moment(item).format('YYYY-MM-DD')}</p>
    }
  },
  {
    name: 'Voucher',
    key: 'voucher_id',
    columnData: (item: string) => {
      return (<p className='text-primary-300'>{item}</p>);
    },
  },
  {
    name: 'Dr. Account',
    textAlign: 'text-start',
    key: 'DebitAccount',
    columnData: (item: { name: string }) => {
      return item?.name;
    },
  },
  {
    name: 'Cr. Account',
    textAlign: 'text-start',
    key: 'CreditAccount',
    columnData: (item: { name: string }) => {
      return item?.name;
    },
  },
  { name: 'Amount(₹)', key: 'amount', textAlign: 'text-end' },
];
