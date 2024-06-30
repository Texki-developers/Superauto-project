import { DateInput } from "./CustomDateField"

const DateFilter = () => {
    return (
        <div className="flex gap-2">
            <DateInput placeholder="Date From" onChange={() => { }} value="5" />
            <DateInput placeholder="Date To" onChange={() => { }} value="5" />
        </div>
    )
}

export default DateFilter