/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITableColumn } from '../../types/table/table';
import './style.scss';

interface ITableProps {
  columnData: ITableColumn[];
  data: { [key: string]: any }[];
  hideFooter?: boolean
}

const Table = (props: ITableProps) => {
  return (
    <div className='bg-white-100 w-full h-full overflow-hidden rounded-lg border border-gray-300 flex justify-between flex-col'>
      <table className='w-full'>
        <thead className='border-b border-gray-300'>
          <tr className='p-3'>
            {props?.columnData?.map((item) => (
              <th key={item?.key}>{item?.name}</th>
            ))}
          </tr>
        </thead>
        <tbody className='h-full oveflow-auto'>
          {props?.data?.map((item: any, i: number) => {
            return (
              <tr key={i} >
                {props?.columnData?.map((keyItem) => (
                  <td key={keyItem.key}>
                    {keyItem?.columnData ? (
                      <span className='grid w-full place-items-center'>
                        {keyItem?.columnData(item?.[keyItem.key])}
                      </span>
                    ) : (
                      item?.[keyItem?.key]
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!props?.hideFooter && <footer className='flex gap-5 border-t border-gray-300 p-3 align-middle'>
        <div className='perpage flex items-center gap-2'>
          <p className='text-[12px] leading-none'>Per Page</p>
          <select className='rounded border border-black-200 bg-gray-200 p-1 text-[12px]'>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
          </select>
        </div>
        <div className='pagination flex gap-1  align-middle'>
          <span className='pagination-box'>1</span>
          <span className='pagination-box'>2</span>
          <span className='pagination-box'>3</span>
          <span className='font-bold leading-none tracking-wide'>...</span>
          <span className='pagination-box'>8</span>
        </div>
      </footer>}
    </div>
  );
};

export default Table;
