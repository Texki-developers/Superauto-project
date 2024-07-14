import { useQuery } from "@tanstack/react-query"
import SelectFilter from "../../../components/filterComponent/selectFilter/Select"
import Header from "../../../components/header/Header"
import Table from "../../../components/table/Table"
import useGetApis from "../../../hooks/useGetApi.hook"
import Loading from "../../../components/loading/Loading"
import { ColumnData } from "./dailyBook.data"
import { useSearchParams } from "react-router-dom"
import DateFilter from "../../../components/filterComponent/dateFilter/DateFilter"
import moment from "moment"
import { useState } from "react"

const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'All Reports' },
    { name: 'DailyBook' },
]
const DailyBook = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { callApi } = useGetApis()
    const [fromDate, setFromDate] = useState(moment('2024-01-06').format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(moment('2024-01-08').format('YYYY-MM-DD'));
    let url = `reports/daily-report?fromDate=${fromDate}&toDate=${toDate}`
    if (searchParams.get('filter')) {
        url = url + `&voucher=${searchParams.get('filter')}`
    }

    const selectUrl = `reports/list/dailybook-voucher`
    const fetchDailyBook = () => callApi(url);
    const fetchDailyBookFilterData = () => callApi(selectUrl);
    const { data, isPending } = useQuery({ queryKey: [url, searchParams.get('filter')], queryFn: fetchDailyBook })
    const { data: options } = useQuery({ queryKey: [selectUrl], queryFn: fetchDailyBookFilterData })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFilterChanged = (value: any) => {
        if (value?.prefix !== 'All') {
            searchParams.set('filter', value?.prefix)
            setSearchParams(searchParams)
        } else {
            searchParams.delete('filter')
            setSearchParams(searchParams)
        }
    }
    const handleDateFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFromDate = moment(event.target.value).format('YYYY-MM-DD');
        setFromDate(newFromDate);
    };

    const handleDateToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newToDate = moment(event.target.value).format('YYYY-MM-DD');
        setToDate(newToDate);
    };
    return (
        <>
            {
                isPending && <Loading />
            }
            <main className="table-wrapper">
                <Header title="Daily Book" breadCrumbData={breadCrumbData} />
                <div className=" py-3 flex justify-end gap-3">
                    <SelectFilter
                        defaultValue={{ prefix: 'All' }}
                        showAllOption
                        labelName="prefix"
                        valueName="prefix"
                        placeholder="Filter"
                        onChange={onFilterChanged}
                        options={options?.data} />
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
                <section className='pt-5 pb-2'>
                    <Table
                        getClassNames={(data) => {
                            if (data?.description === "Opening Balance") {
                                return 'bg-[#43B4F7]'
                            }
                            if (data?.description === 'Closing Balance') {
                                return 'bg-red-300'
                            }
                            return ''
                        }}
                        showRowColor
                        data={data?.data}
                        columnData={ColumnData}
                        hideFooter
                    />
                </section>
            </main>
        </>
    )
}

export default DailyBook