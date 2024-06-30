import DateFilter from "../../../components/filterComponent/dateFilter/DateFilter"
import SelectFilter from "../../../components/filterComponent/selectFilter/Select"
import Header from "../../../components/header/Header"
import Table from "../../../components/table/Table"
import { dummyData } from "../../employees/employees.data"
import { ColumnData } from "../../vehicles/vehicle.data"

const DailyBook = () => {
    const breadCrumbData = [
        { name: 'Dashboard', link: '/' },
        { name: 'All Reports' },
        { name: 'DailyBook' },
    ]
    return (
        <main className="table-wrapper">
            <Header title="Daily Book" breadCrumbData={breadCrumbData} />
            <div className=" py-3 flex justify-end gap-3">
                <SelectFilter placeholder="Filter" onChange={() => { }} options={[]} />
                <DateFilter />
            </div>
            <section className='pt-5 pb-2'>
                <Table data={dummyData} columnData={ColumnData} hideFooter />
            </section>
        </main>
    )
}

export default DailyBook