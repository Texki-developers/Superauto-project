/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ITableColumn } from '../../types/table/table';
import './style.scss';
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';

interface ITableProps {
  columnData: ITableColumn[];
  data: { [key: string]: any }[];
  hideFooter?: boolean
}


const totalItemsPerPage = [
  10,
  20,
  30,
]

const Table = (props: ITableProps) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState('10');

  const handlePageClick = (event: {
    selected: number;
  }) => {
    const newOffset = (event.selected * Number(itemsPerPage)) % props?.data?.length;
    setItemOffset(newOffset);
  };
  return (
    <div className='bg-white-100 w-full h-full overflow-hidden rounded-lg border border-gray-300 flex justify-between flex-col'>
      <table className='w-full'>
        <thead className='border-b border-gray-300'>
          <tr className='p-3'>
            {props?.columnData?.map((item) => (
              <th key={uuidv4()}>{item?.name}</th>
            ))}
          </tr>
        </thead>
        <tbody className='h-full oveflow-auto'>
          {props?.data?.length > 0 && props?.data?.map((item: any, i: number) => {
            return (
              <tr key={i} >
                {props?.columnData?.map((keyItem) => (
                  <td key={uuidv4()}>
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
          <select value={itemsPerPage} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setItemsPerPage(e.target.value) }} className='rounded border border-black-200 bg-gray-200 p-1 text-[12px]'>
            {
              totalItemsPerPage?.map((item) => (
                <option key={uuidv4()} value={item}>
                  {item}
                </option>
              ))
            }
          </select>
        </div>
        <div className="pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={20}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
          />
        </div>
      </footer>}
    </div>
  );
};

export default Table;
