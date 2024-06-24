interface ICheckBoxProps {
    label: string
}
const CheckBox = ({ label }: ICheckBoxProps) => {
    return (
        <div className="flex gap-2 items-center ">
            <input className="w-[15px] h-[15px] cursor-pointer checked:bg-primary-300" type='checkbox' id='checkbox' />
            <label className="input-label cursor-pointer select-none" htmlFor='checkbox'>{label}</label>
        </div>
    )
}

export default CheckBox