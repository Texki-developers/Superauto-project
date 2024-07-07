import moment from 'moment';
import { ITableColumn } from '../../../types/table/table';

export const ColumnData: ITableColumn[] = [
  {
    name: 'Date', key: 'date', columnData: (item: string) => {
      return <p>{moment(item).format('YYYY-MM-DD')}</p>
    }
  },
  {
    name: '#',
    key: 'voucherid',
    columnData: (item: string) => {
      return (<p className='text-primary-300'>{item}</p>);
    },
  },
  {
    name: 'Note',
    key: 'description',
    columnData: (item: { name: string }) => {
      return item?.name;
    },
  },
  {
    name: 'Debit(₹)',
    key: 'debit',
    columnData: (item: { name: string }) => {
      return item?.name;
    },
  },
  {
    name: 'Credit(₹)',
    key: 'credit',
    columnData: (item: { name: string }) => {
      return item?.name;
    },
  },
  { name: 'Balance', key: 'closingbalance' },
];
