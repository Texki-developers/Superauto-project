import { useEffect, useState } from "react"
import Header from "../../../components/header/Header"
import Loading from "../../../components/loading/Loading"
import useQueryGetApi from "../../../hooks/useQueryGetApi.hook"
import ProfitAndLossTable from "./components/ps-table"
import { useSearchParams } from "react-router-dom"
import { yearsOptions } from "../../../config/years.data"
import NormalDropdown from "../../../components/normalDropDown/NormalDropdown"

const ProfitAndLoss = () => {
    const [formattedData, setFormattedData] = useState({})
    const [dateData, setDateData] = useState<string>('2024-2025')
    const breadCrumbData = [
        { name: 'Dashboard', link: '/' },
        { name: 'All Reports' },
        { name: 'Profit And Loss' },
    ]
    const url = `reports/list/profit-loss?fromDate=${dateData.split('-')?.[0]}&toDate=${dateData.split('-')?.[1]}`
    const { data, isPending } = useQueryGetApi(url)
    const [, setSearchParams] = useSearchParams()
    const getFormatData = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formatted: any = {};
        // eslint-disable-next-line no-unsafe-optional-chaining
        for (const item of data?.data) {
            formatted[item.name] = { total: item.Total, account_id: item.account_id }
        }
        console.log(formatted)
        setFormattedData(formatted)
    }
    useEffect(() => {
        if (data?.data) {
            getFormatData()
        }
    }, [data])
    const onChange = (value: string) => {

        setDateData(value)
    }

    useEffect(() => {
        setSearchParams(prevParams => {
            prevParams.set('date', dateData);
            return prevParams;
        });
    }, [dateData]);
    return (
        <>
            {
                isPending && <Loading />
            }
            <main className="table-wrapper">
                <Header title="Profit And Loss" breadCrumbData={breadCrumbData} />
                <div className=" py-3 flex justify-end gap-3">
                    <NormalDropdown value={dateData} options={yearsOptions} onChange={onChange} />
                </div>
                <section className='pt-5 pb-2'>
                    <ProfitAndLossTable data={formattedData} />
                </section>
            </main>
        </>
    )
}

export default ProfitAndLoss