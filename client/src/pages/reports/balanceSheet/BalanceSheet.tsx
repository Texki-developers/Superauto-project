import { useEffect, useState } from "react"
import Header from "../../../components/header/Header"
import Loading from "../../../components/loading/Loading"
import useQueryGetApi from "../../../hooks/useQueryGetApi.hook"
import BalanceSheetTable from "./components/bs-table"
import { IBalanceSheetData, IFormattedBalanceSheet } from "../../../types/balanceSheet/balanceSheet"

const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'All Reports' },
    { name: 'Balance Sheet' },
]
const BalanceSheet = () => {
    const [formatedData, setFormatedData] = useState<IFormattedBalanceSheet | null>(null)
    const url = `reports/balance-sheet`
    const { data, isPending } = useQueryGetApi(url)
    const getFormatData = (data: IBalanceSheetData[]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const store: any = {
            "asset": {
                children: [],
                balance: 0
            },
            "liability": {
                children: [],
                balance: 0
            },
            "equity": {
                children: [],
                balance: 0
            }
        }
        for (const item of data) {
            if (item?.ledger === 'Total') {
                store[item?.category].balance = item?.balance
                continue;
            }
            if (store[item?.category]) {
                const obj = store[item?.category]
                obj.children && obj.children.push(item)
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
                <Header title="Balance Sheet" breadCrumbData={breadCrumbData} />
                <div className=" py-3 flex justify-end gap-3">
                    {/* <DateFilter /> */}
                </div>
                <section className='pt-5 pb-2'>
                    <BalanceSheetTable data={formatedData} />
                </section>
            </main>
        </>
    )
}

export default BalanceSheet