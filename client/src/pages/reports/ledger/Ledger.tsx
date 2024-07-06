import { ActionMeta, SingleValue } from "react-select"
import DateFilter from "../../../components/filterComponent/dateFilter/DateFilter"
import SelectFilter from "../../../components/filterComponent/selectFilter/Select"
import Header from "../../../components/header/Header"
import Table from "../../../components/table/Table"
import { ColumnData } from "../../vehicles/vehicle.data"
import { useState } from "react"
import { dummyData } from "../dummyData.data"

const Ledger = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedLedger, setSelectedLedger] = useState<any>({ label: 'Cash Book', value: 'cashbook' })

    const onSelectableFilter = (newValue: SingleValue<string>, actionMeta: ActionMeta<string>) => {
        console.log(newValue, actionMeta)
        setSelectedLedger(newValue)
    }

    const breadCrumbData = [
        { name: 'Dashboard', link: '/' },
        { name: 'All Reports' },
        { name: 'Ledger' },
    ]
    const options = [
        { label: 'B3 All Cars', value: 'b3' },
        { label: 'Cash Book', value: 'cashbook' },
    ]
    return (
        <main className="table-wrapper">
            <Header title={`Ledger | ${selectedLedger?.label}`} breadCrumbData={breadCrumbData} />
            <div className=" py-5 flex justify-between gap-3">
                <SelectFilter
                    defaultValue={selectedLedger}
                    className="w-[300px]"
                    placeholder="Switch Ledger"
                    onChange={onSelectableFilter}
                    options={options}
                />
                <DateFilter />
            </div>
            <section className='pt-5 pb-2'>
                <Table data={dummyData} columnData={ColumnData} hideFooter />
            </section>
        </main>
    )
}

export default Ledger