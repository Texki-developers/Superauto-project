import { useState, useEffect } from 'react';
import Header from '../../../components/header/Header';
import Table from '../../../components/table/Table';
import useGetApis from '../../../hooks/useGetApi.hook';
import Loading from '../../../components/loading/Loading';
import { ColumnData } from './salesReport.data';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import DateFilter from '../../../components/filterComponent/dateFilter/DateFilter';

const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'All Reports' },
    { name: 'Sales Report' },
];
const SalesReport = () => {
    const [, setSearchParams] = useSearchParams();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tableData, setTableData] = useState<any>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [lastItem, setLastItem] = useState<any>()
    const { callApi } = useGetApis();
    const [fromDate, setFromDate] = useState(moment('2024-01-06').format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(moment('2024-01-08').format('YYYY-MM-DD'));
    // const [dateData, setDateData] = useState<string>('2023-2024')

    const url = `reports/list/sales-report?fromDate=${fromDate}&toDate=${toDate}`;
    const fetchSalesReturn = () => callApi(url);
    const { data, isPending } = useQuery({ queryKey: [url], queryFn: fetchSalesReturn });

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
                return i !== data?.data?.length - 1
            })
            setTableData(notLastItem)

            if (data?.data?.length > 0) {
                setLastItem(data?.data[data?.data?.length - 1])
            }
        }
    }, [data])
    // useEffect(() => {
    //     setSearchParams(prevParams => {
    //         prevParams.set('date', dateData);
    //         return prevParams;
    //     });
    // }, [dateData]);
    // const onChange = (value: string) => {
    //     setDateData(value)
    // }
    const FooterResult = () => {
        return (
            <>
                {
                    lastItem &&
                    <tr>
                        <td></td>
                        <td></td>
                        <td className='text-center'>{lastItem?.description}</td>
                        <td className='text-start'>{lastItem?.debit}</td>
                        <td className='text-start'>{lastItem?.credit}</td>
                        <td className='text-end'>{lastItem?.runningbalance}</td>
                    </tr>
                }
            </>
        )
    }

    return (
        <>
            {isPending && <Loading />}
            <main className="table-wrapper">
                <Header title="Sales Report" breadCrumbData={breadCrumbData} />
                <div className="py-3 flex justify-end gap-3">
                    {/* <NormalDropdown value={dateData} options={yearsOptions} onChange={onChange} /> */}
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
                    <Table
                        showFooterBalance
                        balanceFooterComponent={<FooterResult />}
                        data={tableData}
                        columnData={ColumnData}
                        hideFooter />
                </section>
            </main>
        </>
    );
};

export default SalesReport;
