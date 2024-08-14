import DoneIcon from '../../assets/icons/Done.svg';
import Error from '../../assets/icons/error.svg';
import { ITableColumn } from '../../types/table/table';


export const ColumnData: ITableColumn[] = [
  { name: 'ID', key: 'inventory_id' },
  { name: 'Vehicle No', key: 'registration_number' },
  {
    name: 'Customer', key: 'Account', columnData: (value: { name: string }) => {
      return (
        <p>{value?.name}</p>
      )
    }
  },
  {
    name: 'Mobile', key: 'Account',
    columnData: (value: { contact_info: string }) => {
      return (
        <p>{value?.contact_info}</p>
      )
    }
  },
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