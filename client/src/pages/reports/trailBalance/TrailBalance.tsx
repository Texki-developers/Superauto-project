import { useSearchParams } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Loading from '../../../components/loading/Loading'
import useQueryGetApi from '../../../hooks/useQueryGetApi.hook'
// import DateFilter from '../../../components/filterComponent/dateFilter/DateFilter'
import TrialTable from './components/trial-table'
import { useEffect, useState } from 'react'
import moment from 'moment'
import DateFilter from '../../../components/filterComponent/dateFilter/DateFilter'

const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'All Reports' },
    { name: 'Trial Balance' },
]
const TrailBalance = () => {
    const [, setSearchParams] = useSearchParams();
    const [fromDate, setFromDate] = useState(moment('2024-04-01').format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
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
                    <TrialTable data={data} />
                </section>
            </main>
        </>
    )
}

export default TrailBalance