import Header from '../../../components/header/Header'
import DateFilter from '../../../components/filterComponent/dateFilter/DateFilter'
import TrialTable from './components/trial-table'

const TrailBalance = () => {
    const breadCrumbData = [
        { name: 'Dashboard', link: '/' },
        { name: 'All Reports' },
        { name: 'Trial Balance' },
    ]
    return (
        <main className="table-wrapper">
            <Header title="Trial Balance" breadCrumbData={breadCrumbData} />
            <div className=" py-3 flex justify-end gap-3">
                {/* <SelectFilter placeholder="Filter" onChange={() => { }} options={[]} /> */}
                <DateFilter />
            </div>
            <section className='pt-5 pb-2'>
                <TrialTable />
            </section>
        </main>
    )
}

export default TrailBalance