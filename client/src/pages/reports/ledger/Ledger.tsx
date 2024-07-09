import { useState, useEffect } from 'react';
import { SingleValue } from 'react-select';
import moment from 'moment';
import DateFilter from '../../../components/filterComponent/dateFilter/DateFilter';
import SelectFilter from '../../../components/filterComponent/selectFilter/Select';
import Header from '../../../components/header/Header';
import Table from '../../../components/table/Table';
import useGetApis from '../../../hooks/useGetApi.hook';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/loading/Loading';
import { ColumnData } from './ledger.data';


const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'All Reports' },
    { name: 'Ledger' },
];

const Ledger = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tableData, setTableData] = useState<any>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [lastItem, setLastItem] = useState<any>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [fromDate, setFromDate] = useState(moment('2024-04-01').format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(moment('2025-03-31').format('YYYY-MM-DD'));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSelectableFilter = (newValue: SingleValue<any>) => {
        searchParams.set('filter', newValue.account_id);
        searchParams.set('name', newValue.name);
        setSearchParams(searchParams);
    };

    const { callApi } = useGetApis();
    let url = `reports/ledger-report?fromDate=${fromDate}&toDate=${toDate}`;
    if (searchParams.get('filter')) {
        url = `${url}&ledger=${searchParams.get('filter')}`;
    }
    const selectUrl = `reports/list/ledgers`;
    const fetchLedgerReport = () => callApi(url);
    const fetchLedgerFilterData = () => callApi(selectUrl);
    const { data, isPending } = useQuery({ queryKey: [url, searchParams.get('filter'), fromDate, toDate], queryFn: fetchLedgerReport });
    const { data: options } = useQuery({ queryKey: [selectUrl], queryFn: fetchLedgerFilterData });
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
                        <td className='font-semibold text-sm'>{lastItem?.runningbalance}</td>
                    </tr>
                }
            </>
        )
    }

    return (
        <>
            {isPending && <Loading />}
            <main className="table-wrapper">
                <Header title={`Ledger  ${searchParams.get('name') ? '| ' + searchParams.get('name') : ''}`} breadCrumbData={breadCrumbData} />
                <div className="py-5 flex justify-between gap-3">
                    <SelectFilter
                        labelName="name"
                        valueName="account_id"
                        defaultValue={'none'}
                        className="w-[300px]"
                        placeholder="Switch Ledger"
                        onChange={onSelectableFilter}
                        options={options?.data}
                    />
                    <DateFilter
                        dateFromProps={{
                            placeholder: "Date From",
                            onChange: handleDateFromChange,
                            value: fromDate,
                        }}
                        dateToProps={{
                            placeholder: "Date To",
                            onChange: handleDateToChange,
                            value: toDate,
                        }}
                    />
                </div>
                <section className="pt-5 pb-2">
                    {searchParams.get('name') ? <Table showRowColor balanceFooterComponent={<FooterResult />} data={tableData} showFooterBalance columnData={ColumnData} hideFooter /> :
                        <div className="grid place-items-center">
                            <h2>Select Ledger</h2>
                        </div>
                    }
                </section>
            </main>
        </>
    );
};

export default Ledger;
