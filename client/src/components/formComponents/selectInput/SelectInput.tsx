/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from 'react-select';

interface IOption {
  value: string;
  label: string;
}
interface ISelectInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  onChange: (option: IOption | null) => void;
  value?: string;
  options: IOption[];
  defaultValue?: string;
  hideLabel?: boolean;
  name?: string;
  isDisabled?: boolean;
  isSearchable?: boolean;
}

export default function SelectInput(props: ISelectInputProps) {
  return (
    <div className='gird gap-1'>
      {!props?.hideLabel && (
        <label className='input-label'>
          {props?.label}
          {props?.required && <span>*</span>}{' '}
        </label>
      )}
      <Select
        defaultValue={props?.defaultValue}
        placeholder={props?.placeholder}
        isDisabled={props?.isDisabled}
        name={props?.name}
        isSearchable={props?.isSearchable}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={props?.onChange as any}
        value={props?.value}
        options={props?.options as any}
      />
    </div>
  );
}
