/* eslint-disable @typescript-eslint/no-explicit-any */
interface IInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string;
  type?: string;
  name: string;
  isDisabled?: boolean;
  register: any;
  validation?: (value?: string | number) => boolean
  error: any;
}
const InputBox = (props: IInputProps) => {
  return (
    <div className='grid gap-1 w-full relative'>
      {props?.label && <label className='input-label'>
        {props?.label}
        {props?.required && <span>*</span>}{' '}
      </label>}
      <input
        placeholder={props?.placeholder}
        className='input-normal w-full '
        type={props?.type ?? 'text'}
        value={props.value}
        name={props?.name}
        disabled={props?.isDisabled}
        defaultValue={props?.defaultValue}
        {...props.register(props?.name, { required: props?.required ? `${props.label} is Required` : false, validate: props?.validation })}
        autoComplete="off"
        aria-invalid={props.error?.[props.name ?? ''] ? "true" : "false"}
      />
      <div className="h-3">
        {props.error?.[props?.name ?? ''] && <p role="alert" className="absolute top-16 !text-xs text-red-500">{props.error?.[props.name]?.message}</p>}
      </div>
    </div>
  );
};

export default InputBox;
