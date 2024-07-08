import { useState, useEffect } from 'react';
import moment from 'moment';
import DateFilter from '../../../components/filterComponent/dateFilter/DateFilter';
import Header from '../../../components/header/Header';
import Table from '../../../components/table/Table';
import useGetApis from '../../../hooks/useGetApi.hook';
import Loading from '../../../components/loading/Loading';
import { ColumnData } from './cashbook.data';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'All Reports' },
    { name: 'CashBook' },
];
const CashBook = () => {
    const [, setSearchParams] = useSearchParams();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tableData, setTableData] = useState<any>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [lastItem, setLastItem] = useState<any>()
    const { callApi } = useGetApis();
    const [fromDate, setFromDate] = useState(moment('2024-01-06').format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(moment('2024-01-08').format('YYYY-MM-DD'));

    const url = `reports/cashbook?fromDate=${fromDate}&toDate=${toDate}`;
    const fetchCashBook = () => callApi(url);
    const { data, isPending } = useQuery({ queryKey: [url], queryFn: fetchCashBook });

    const handleDateFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFromDate = moment(event.target.value).format('YYYY-MM-DD');
        setFromDate(newFromDate);
    };

    const handleDateToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newToDate = moment(event.target.value).format('YYYY-MM-DD');
        setToDate(newToDate);
    };

    useEffect(() => {
        setSearchParams(prevParams => {
            prevParams.set('fromDate', fromDate);
            prevParams.set('toDate', toDate);
            return prevParams;
        });
    }, [fromDate, toDate, setSearchParams]);

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const notLastItem = data?.data?.filter((_item: any, i: number) => {
                return i !== data?.data.length - 1
            })
            setTableData(notLastItem)

            if (data?.data.length > 0) {
                setLastItem(data?.data[data?.data.length - 1])
            }
        }
    }, [data])
    const FooterResult = () => {
        return (
            <>
                {
                    lastItem &&
                    <tr>
                        <td></td>
                        <td></td>
                        <td className='font-semibold text-sm'>{lastItem?.description}</td>
                        <td className='font-semibold text-sm'>{lastItem?.debit}</td>
                        <td className='font-semibold text-sm'>{lastItem?.credit}</td>
                        <td className='font-semibold text-sm'>{lastItem?.closingbalance}</td>
                    </tr>
                }
            </>
        )
    }

    return (
        <>
            {isPending && <Loading />}
            <main className="table-wrapper">
                <Header title="Cash Book" breadCrumbData={breadCrumbData} />
                <div className="py-3 flex justify-end gap-3">
                    <DateFilter
                        dateFromProps={{
                            placeholder: 'Date From',
                            onChange: handleDateFromChange,
                            value: fromDate,
                        }}
                        dateToProps={{
                            placeholder: 'Date To',
                            onChange: handleDateToChange,
                            value: toDate,
                        }}
                    />
                </div>
                <section className="pt-5 pb-2">
                    <Table showFooterBalance balanceFooterComponent={<FooterResult />} data={tableData} columnData={ColumnData} hideFooter />
                </section>
            </main>
        </>
    );
};

export default CashBook;
