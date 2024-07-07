import DateFilter from "../../../components/filterComponent/dateFilter/DateFilter"
import Header from "../../../components/header/Header"
import BalanceSheetTable from "./components/bs-table"

const BalanceSheet = () => {
    const breadCrumbData = [
        { name: 'Dashboard', link: '/' },
        { name: 'All Reports' },
        { name: 'Balance Sheet' },
    ]
    return (
        <main className="table-wrapper">
            <Header title="Balance Sheet" breadCrumbData={breadCrumbData} />
            <div className=" py-3 flex justify-end gap-3">
                <DateFilter />
            </div>
            <section className='pt-5 pb-2'>
                <BalanceSheetTable />
            </section>
        </main>
    )
}

export default BalanceSheet