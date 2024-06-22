interface IInputProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  value?: string | number;
  defaultValue?: string;
  type?: string;
  name?: string;
  isDisabled?: boolean;
}
const InputBox = (props: IInputProps) => {
  return (
    <div className='grid gap-1'>
      <label className='text-sm font-bold text-black-200'>
        {props?.label}
        {props?.required && <span>*</span>}{' '}
      </label>
      <input
        placeholder={props?.placeholder}
        className='input-normal'
        type={props?.type ?? 'text'}
        value={props.value}
        name={props?.name}
        disabled={props?.isDisabled}
        defaultValue={props?.defaultValue}
        onChange={(e) => props?.onChange(e.target.value)}
      />
    </div>
  );
};

export default InputBox;
