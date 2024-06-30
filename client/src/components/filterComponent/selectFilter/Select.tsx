/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { ActionMeta, SingleValue } from "react-select"

interface IProps {
    options: any[];
    onChange: (newValue: SingleValue<string>, actionMeta: ActionMeta<string>) => void;
    placeholder?: string;
    className?: string
    defaultValue?: any
}

const SelectFilter = ({ options, defaultValue, onChange, placeholder, className }: IProps) => {
    return (
        <Select
            defaultValue={defaultValue}
            className={"border border-gray-300 outline-none rounded-sm min-w-[200px] " + className}
            placeholder={placeholder ?? "Filter..."}
            options={options}
            isSearchable
            onChange={onChange}
        />
    )
}

export default SelectFilter