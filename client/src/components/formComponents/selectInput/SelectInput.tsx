/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from 'react-select';
import {  Controller } from "react-hook-form";
interface IOption {
  value: string;
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
  control:any
  error:any
}

export default function SelectInput(props: ISelectInputProps) {

  return (
    <div className='gird gap-1 w-full relative'>
      {!props?.hideLabel && (
        <label className='input-label'>
          {props?.label}
          {props?.required && <span>*</span>}{' '}
        </label>
      )}
      <Controller
        name={props.name}
        control={props.control}
        rules={{ required: `${props.label} is required` }}
        defaultValue={props.defaultValue}
        render={({ field }) => (
          <>
          <Select
            placeholder={props?.placeholder}
            isDisabled={props?.isDisabled}
            isSearchable={props?.isSearchable}
            value={props?.value}
            {...field}
            options={props?.options}
            aria-invalid={props.error[props.name??''] ? "true" : "false"}
          />
          {props.error[props.name??''] && (
            <p role="alert" className="absolute top-16 text-xs text-red-500">
              {props.error[props.name??''].message}
            </p>
          )}
        </>
        )}

      />
     
    </div>
  );
}
