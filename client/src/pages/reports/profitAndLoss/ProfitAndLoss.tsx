import { useEffect, useState } from "react"
import Header from "../../../components/header/Header"
import Loading from "../../../components/loading/Loading"
import useQueryGetApi from "../../../hooks/useQueryGetApi.hook"
import ProfitAndLossTable from "./components/ps-table"

const ProfitAndLoss = () => {
    const [formattedData, setFormattedData] = useState({})
    const breadCrumbData = [
        { name: 'Dashboard', link: '/' },
        { name: 'All Reports' },
        { name: 'Profit And Loss' },
    ]
    const url = `reports/list/profit-loss`
    const { data, isPending } = useQueryGetApi(url)
    console.log(data)
    const getFormatData = () => {
        const formated = data?.data?.map((item: { name: string, Total: string, account_id: string }) => (
            {
                [item?.name]: {
                    total: item?.Total,
                    account_id: item?.account_id
                }
            }
        ))
        setFormattedData(formated)
    }
    useEffect(() => {
        if (data?.data) {
            getFormatData()
        }
    }, [data])
    return (
        <>
            {
                isPending && <Loading />
            }
            <main className="table-wrapper">
                <Header title="Profit And Loss" breadCrumbData={breadCrumbData} />
                <div className=" py-3 flex justify-end gap-3">
                    {/* <DateFilter /> */}
                </div>
                <section className='pt-5 pb-2'>
                    <ProfitAndLossTable data={formattedData} />
                </section>
            </main>
        </>
    )
}

export default ProfitAndLoss