/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';
import { ITableColumn } from '../../types/table/table';
import './style.scss';
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';

interface ITableProps {
  columnData: ITableColumn[];
  data: { [key: string]: any }[];
  hideFooter?: boolean;
  meta?: {
    totalCount: number;
    perPage: number;
  };
  showFooterBalance?: boolean;
  balanceFooterComponent?: React.ReactNode;
  showRowColor?: boolean;
}

const totalItemsPerPage = [5, 10, 20, 30];

const Table = (props: ITableProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const headerRef = useRef<HTMLTableSectionElement>(null);
  const footerRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const verify: number | undefined = totalItemsPerPage?.find(
      (item) => item === props?.meta?.perPage
    );
    if (props?.meta?.perPage && verify) {
      setItemsPerPage(props?.meta?.perPage);
    } else {
      setItemsPerPage(10);
    }
  }, [props?.meta]);

  useEffect(() => {
    if (headerRef.current && footerRef.current) {
      const headers = headerRef.current.querySelectorAll('th')
      const footers = footerRef.current.querySelectorAll('td')
      headers.forEach((headerCol, index) => {
        const width = headerCol.getBoundingClientRect().width;
        if (footers[index]) {
          footers[index].style.width = `${width}px`;
        }
      });
    }
  }, [props?.data, props?.columnData, props?.balanceFooterComponent])

  const handlePageClick = (event: { selected: number }) => {
    if (event.selected === 0) {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
    if (event.selected + 1 !== Number(searchParams.get('page'))) {
      searchParams.set('page', String(event.selected + 1));
      setSearchParams(searchParams);
    }
  };

  const handlePerPageClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    searchParams.set('perPage', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className='bg-white-100 w-full h-full overflow-hidden rounded-lg border border-gray-300 flex justify-between flex-col'>
      <table className='w-full'>
        <thead className='border-b border-gray-300' ref={headerRef}>
          <tr className='p-3'>
            {props?.columnData?.map((item) => (
              <th
                id={`table-${item?.name.split(' ').join('')}`}
                key={uuidv4()}
              >
                {item?.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='h-full overflow-auto'>
          {props?.data?.length > 0 &&
            props?.data?.map((item: any, i: number) => {
              return (
                <tr className={(props?.showRowColor && i % 2 == 1) ? 'bg-gray-100' : ""} key={i}>
                  {props?.columnData?.map((keyItem) => (
                    <td className={props?.showRowColor ? 'py-2 px-4' : 'p-4'} key={uuidv4()}>
                      {keyItem?.columnData && keyItem?.key ? (
                        <span className='grid w-full place-items-center'>
                          {keyItem?.columnData(item?.[keyItem?.key])}
                        </span>
                      ) : keyItem?.key ? (
                        item?.[keyItem?.key]
                      ) : keyItem?.index ? (
                        i + 1
                      ) : (
                        ''
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </table>
      {props?.showFooterBalance && (
        <table>
          <tbody
            className='gap-5 border-t border-gray-300 p-3 align-middle'
            ref={footerRef}
          >
            {props?.balanceFooterComponent}
          </tbody>
        </table>
      )}
      {!props?.hideFooter && (
        <footer className='flex gap-5 border-t border-gray-300 p-3 align-middle'>
          <div className='perpage flex items-center gap-2'>
            <p className='text-[12px] leading-none'>Per Page</p>
            <select
              value={itemsPerPage}
              onChange={handlePerPageClick}
              className='rounded border border-black-200 bg-gray-200 p-1 text-[12px]'
            >
              {totalItemsPerPage?.map((item) => (
                <option key={uuidv4()} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className='pagination'>
            <ReactPaginate
              breakLabel='...'
              nextLabel='Next'
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={
                props?.meta?.totalCount
                  ? Math.ceil(props?.meta?.totalCount / Number(itemsPerPage))
                  : 0
              }
              previousLabel='Prev'
              renderOnZeroPageCount={null}
              initialPage={
                searchParams.get('page')
                  ? Number(searchParams.get('page')) - 1
                  : 0
              }
            />
          </div>
        </footer>
      )}
    </div>
  );
};

export default Table;

Table.defaultProps = {
  meta: {
    totalCount: 0,
    perPage: 10,
  },
};
