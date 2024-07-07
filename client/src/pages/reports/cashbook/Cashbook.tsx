

import { useQuery } from "@tanstack/react-query"
import DateFilter from "../../../components/filterComponent/dateFilter/DateFilter"
import SelectFilter from "../../../components/filterComponent/selectFilter/Select"
import Header from "../../../components/header/Header"
import Table from "../../../components/table/Table"
import useGetApis from "../../../hooks/useGetApi.hook"
import Loading from "../../../components/loading/Loading"
import { ColumnData } from "./cashbook.data"

const CashBook = () => {
    const breadCrumbData = [
        { name: 'Dashboard', link: '/' },
        { name: 'All Reports' },
        { name: 'CashBook' },
    ]
    const { callApi } = useGetApis()
    const url = `reports/daily-report?voucher=EXP`
    const fetchVehicles = () => callApi(url);
    const { data, isPending } = useQuery({ queryKey: [url], queryFn: fetchVehicles })
    return (
        <>
            {
                isPending && <Loading />
            }
            <main className="table-wrapper">
                <Header title="Cash Book" breadCrumbData={breadCrumbData} />
                <div className=" py-3 flex justify-end gap-3">
                    <SelectFilter placeholder="Filter" onChange={() => { }} options={[]} />
                    <DateFilter />
                </div>
                <section className='pt-5 pb-2'>
                    <Table data={data} columnData={ColumnData} hideFooter />
                </section>
            </main>
        </>
    )
}

export default CashBook