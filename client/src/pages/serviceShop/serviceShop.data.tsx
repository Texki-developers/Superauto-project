// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import moment from "moment"

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
    name: 'Date',
    key: 'createdAt',
    columnData: (item: string) => {
      return <p>{item && moment(item).format('YYYY-MM-DD')}</p>
    }
  },
];
