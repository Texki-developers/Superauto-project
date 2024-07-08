import Header from "../../../components/header/Header"
import Loading from "../../../components/loading/Loading"
import useQueryGetApi from "../../../hooks/useQueryGetApi.hook"
import BalanceSheetTable from "./components/bs-table"

const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'All Reports' },
    { name: 'Balance Sheet' },
]
const BalanceSheet = () => {
    const url = `reports/balance-sheet`
    const { data, isPending } = useQueryGetApi(url)
    return (
        <>
            {
                isPending && <Loading />
            }
            <main className="table-wrapper">
                <Header title="Balance Sheet" breadCrumbData={breadCrumbData} />
                <div className=" py-3 flex justify-end gap-3">
                    {/* <DateFilter /> */}
                </div>
                <section className='pt-5 pb-2'>
                    <BalanceSheetTable data={data} />
                </section>
            </main>
        </>
    )
}

export default BalanceSheet