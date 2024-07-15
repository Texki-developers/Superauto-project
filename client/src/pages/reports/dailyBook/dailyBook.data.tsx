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
    name: '#',
    key: 'voucher_id',
    columnData: (item: string) => {
      return (<p className='text-primary-300'>{item}</p>);
    },
  },
  {
    name: 'Note',
    key: 'description',
    columnData: (item: string) => {
      return (
        <p className={["Opening Balance", "Closing Balance"].includes(item) ? 'uppercase font-semibold' : ''}>{item}</p>
      );
    },
  },
  {
    name: 'Dr',
    textAlign: 'text-start',
    key: 'debit',
    returnData: true,
    columnData: (item: string, data: { description: string }) => {
      if (["Opening Balance", "Closing Balance"].includes(data?.description)) {
        return ''
      } else {
        return item
      }
    },
  },
  {
    name: 'Cr',
    textAlign: 'text-start',
    key: 'credit',
    returnData: true,
    columnData: (item: string, data: { description: string }) => {
      if (["Opening Balance", "Closing Balance"].includes(data?.description)) {
        return ''
      } else {
        return item
      }
    },
  },
  { name: 'Amount(₹)', key: 'runningbalance', textAlign: 'text-end' },
];
