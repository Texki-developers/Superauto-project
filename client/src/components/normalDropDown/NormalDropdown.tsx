
interface IProps {
    onChange: (value: string) => void;
    value: string;
    options: { value: string, label: string }[]
}
const NormalDropdown = (props: IProps) => {
    return (
        <select className="h-[40px] py-2 px-3 bg-white-100 rounded-md border border-gray-300  outline-none text-gray-300" value={props?.value} onChange={(e) => props?.onChange(e.target.value)} name="" id="">
            {props?.options?.map((item, i) => (
                <option className="text-black-100 p-3" key={i} value={item?.value}> {item?.label} </option>
            ))}
        </select>
    )
}

export default NormalDropdown