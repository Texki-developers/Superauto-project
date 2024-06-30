/* eslint-disable @typescript-eslint/no-explicit-any */
interface ICheckBoxProps {
    label: string;
    placeholder?: string;
    value?: string | number;
    defaultValue?: string;
    type?: string;
    name: string;
    required?: boolean;
    isDisabled?: boolean;
    register: any;
    error: any;
}
const CheckBox = (props: ICheckBoxProps) => {
    return (
        <div className="flex gap-2 items-center ">
            <input
                value={props.value}
                name={props?.name}
                disabled={props?.isDisabled}
                defaultValue={props?.defaultValue}
                {...props.register(props?.name, { required: props?.required ? `${props.label} is Required` : false })}
                aria-invalid={props.error?.[props.name ?? ''] ? "true" : "false"}
                className="w-[15px] h-[15px] cursor-pointer checked:bg-primary-300" type='checkbox' id='checkbox' />
            <label className="input-label cursor-pointer select-none" htmlFor='checkbox'>{props.label}</label>
        </div>
    )
}

export default CheckBox