import moment from 'moment';
import { ITableColumn } from '../../../types/table/table';

export const ColumnData: ITableColumn[] = [
  {
    name: 'Date', key: 'date', columnData: (item: string) => {
      return <p>{item && moment(item).format('YYYY-MM-DD')}</p>
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

  },
  {
    name: 'Debit(₹)',
    key: 'debit',
    textAlign: 'text-start',

  },
  {
    name: 'Credit(₹)',
    key: 'credit',
    textAlign: 'text-start',
  },
  {
    name: 'Balance',
    key: 'runningbalance',
    textAlign: 'text-end',

  },
];
