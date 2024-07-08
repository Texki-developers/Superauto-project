import { useSearchParams } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Loading from '../../../components/loading/Loading'
import useQueryGetApi from '../../../hooks/useQueryGetApi.hook'
// import DateFilter from '../../../components/filterComponent/dateFilter/DateFilter'
import TrialTable from './components/trial-table'
import { useEffect, useState } from 'react'
import moment from 'moment'
import DateFilter from '../../../components/filterComponent/dateFilter/DateFilter'
import { IFormatedData, ITrialBalanceData } from '../../../types/trialBalance/trialBalance'




const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'All Reports' },
    { name: 'Trial Balance' },
]
const TrailBalance = () => {
    const [, setSearchParams] = useSearchParams();
    const [fromDate, setFromDate] = useState(moment('2024-04-01').format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
    const [formatedData, setFormatedData] = useState<IFormatedData | null>(null)
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
    const url = `reports/trial-balance?fromDate=${fromDate}&toDate=${toDate}`
    const { data, isPending } = useQueryGetApi(url)
    const getFormatData = (data: ITrialBalanceData[]) => {
        console.log(data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const store: any = {
            asset: { children: [] },
            liability: { children: [] },
            Purchase: { children: [] },
            Sales: { children: [] }
        }
        for (const item of data) {
            if (item?.ledger === 'Purchase') {
                store.Purchase = item;
                continue;
            }
            if (item?.ledger === 'Sales') {
                store.Sales = item;
                continue;
            }
            if (item?.ledger === 'Total') {
                if (store?.[item?.type]) {
                    const obj = store[item?.type]
                    obj && (obj['total_credit'] = item?.total_credit)
                    obj && (obj['total_debit'] = item?.total_debit)
                }
                continue;
            }
            if (store?.[item?.type]) {
                const obj = store[item?.type]
                obj?.children && obj.children.push(item)
                continue;
            }
        }
        setFormatedData(store)
    }
    useEffect(() => {
        if (data?.data) {
            getFormatData(data?.data)
        }
    }, [data])
    return (
        <>
            {
                isPending && <Loading />
            }
            <main className="table-wrapper">
                <Header title="Trial Balance" breadCrumbData={breadCrumbData} />
                <div className=" py-3 flex justify-end gap-3">
                    {/* <SelectFilter placeholder="Filter" onChange={() => { }} options={[]} /> */}
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
                <section className='pt-5 pb-2'>
                    <TrialTable data={formatedData} />
                </section>
            </main>
        </>
    )
}

export default TrailBalance