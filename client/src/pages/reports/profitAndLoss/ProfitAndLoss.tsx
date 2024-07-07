import DateFilter from "../../../components/filterComponent/dateFilter/DateFilter"
import Header from "../../../components/header/Header"
import ProfitAndLossTable from "./components/ps-table"

const ProfitAndLoss = () => {
    const breadCrumbData = [
        { name: 'Dashboard', link: '/' },
        { name: 'All Reports' },
        { name: 'Profit And Loss' },
    ]
    return (
        <main className="table-wrapper">
            <Header title="Profit And Loss" breadCrumbData={breadCrumbData} />
            <div className=" py-3 flex justify-end gap-3">
                <DateFilter />
            </div>
            <section className='pt-5 pb-2'>
                <ProfitAndLossTable />
            </section>
        </main>
    )
}

export default ProfitAndLoss