import DoneIcon from '../../assets/icons/done.svg';
import Error from '../../assets/icons/error.svg';
import { ITableColumn } from '../../types/table/table';


export const ColumnData: ITableColumn[] = [
  { name: 'ID', key: 'inventory_id' },
  { name: 'Vehicle No', key: 'registration_number' },
  { name: 'Customer', key: 'ownership_name' },
  { name: 'Mobile', key: 'mobile' },
  {
    name: 'RC',
    key: 'rc_book',
    columnData: (value: string) => {
      return value ? (
        <img className="w-[20px] h-[20px]" src={DoneIcon} alt='done' />
      ) : (
        <img className="w-[20px] h-[20px]" src={Error} alt='done' />
      );
    },
  },
  {
    name: 'Insurance',
    key: 'insurance_doc',
    columnData: (value: string) => {
      return value ? (
        <img className="w-[20px] h-[20px]" src={DoneIcon} alt='done' />
      ) : (
        <img className="w-[20px] h-[20px]" src={Error} alt='done' />
      );
    },
  },
  {
    name: 'Proof',
    key: 'proof_doc',
    columnData: (value: string) => {
      return value ? (
        <img className="w-[20px] h-[20px]" src={DoneIcon} alt='done' />
      ) : (
        <img className="w-[20px] h-[20px]" src={Error} alt='done' />
      );
    },
  },
  {
    name: 'Date',
    key: 'date_of_purchase',
  },
];
