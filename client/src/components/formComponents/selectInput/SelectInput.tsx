/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from 'react-select';
import { Controller } from "react-hook-form";
interface IOption {
  value: string | number;
  label: string;
}
interface ISelectInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  options: IOption[];
  defaultValue?: string;
  hideLabel?: boolean;
  name?: string;
  isDisabled?: boolean;
  isSearchable?: boolean;
  control: any
  error: any
  labelName?: string;
  valueName?: string;
}

export default function SelectInput(props: ISelectInputProps) {
  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      maxHeight: '150px',
      zIndex: 999
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: 150, // or '150px'
      zIndex: 999
    }),
  };
  return (
    <div className='grid gap-1 w-full relative'>
      {!props?.hideLabel && (
        <label className='input-label'>
          {props?.label}
          {props?.required && <span>*</span>}{' '}
        </label>
      )}
      <Controller
        name={props.name as string}
        control={props.control}
        rules={props.required ? { required: `${props.label} is required` } : {}}
        defaultValue={props.defaultValue}
        render={({ field }) => (
          <>
            <Select
              placeholder={props?.placeholder}
              isDisabled={props?.isDisabled}
              isSearchable={props?.isSearchable}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              value={props?.value}
              getOptionLabel={(data) => { return props?.labelName ? data[props?.labelName] : data?.label }}
              getOptionValue={(data) => { return props?.valueName ? data[props?.valueName] : data?.value }}
              {...field}
              options={props?.options}
              styles={customStyles}
              aria-invalid={props?.error?.[props?.name ?? ''] ? "true" : "false"}
            />
          </>
        )}

      />
      <div className="h-3">
        {props?.error?.[props?.name ?? ''] && (
          <p role="alert" className="absolute top-16 text-xs text-red-500">
            {props?.error?.[props?.name ?? '']?.message}
          </p>
        )}
      </div>

    </div>
  );
}
