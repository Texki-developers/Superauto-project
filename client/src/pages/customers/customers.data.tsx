// @ts-ignore
import moment from "moment"
import { ICategory } from "../../types/apimodal/apimodal";

export const ColumnData = [
  {
    name: 'ID',
    key: 'account_id',
  },
  {
    name: 'Financer Name',
    key: 'name',
  },
  {
    name: 'Mobile',
    key: 'contact_info',
  },
  {
    name: 'Broker',
    key: 'category',
    columnData: (item: string) => {
      return <p>{item === ICategory.CUSTOMER ? 'No' : 'Yes'}</p>
    }
  },
  {
    name: 'Date',
    key: 'createdAt',
    columnData: (item: string) => {
      return <p>{moment(item).format('YYYY-MM-DD')}</p>
    }
  },
];