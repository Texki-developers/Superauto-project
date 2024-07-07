/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { ActionMeta, SingleValue } from "react-select"

interface IProps {
    options: any[];
    onChange: (newValue: SingleValue<string>, actionMeta: ActionMeta<string>) => void;
    placeholder?: string;
    className?: string
    defaultValue?: any
    labelName: string
    valueName: string
    showAllOption?: boolean
}

const SelectFilter = ({ options, showAllOption, defaultValue, labelName, valueName, onChange, placeholder, className }: IProps) => {
    return (
        <Select
            defaultValue={defaultValue}
            className={"border border-gray-300 outline-none rounded-sm min-w-[200px] " + className}
            placeholder={placeholder ?? "Filter..."}
            getOptionLabel={(opt: any) => opt[labelName]}
            getOptionValue={(opt: any) => opt[valueName]}
            isSearchable
            options={options?.length > 0 ? (showAllOption ? [{ prefix: 'All' }, ...options] : options) : []}
            aria-label="name"
            onChange={onChange}
        />
    )
}

export default SelectFilter