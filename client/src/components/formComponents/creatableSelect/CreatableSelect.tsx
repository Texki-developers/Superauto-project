/* eslint-disable @typescript-eslint/no-explicit-any */
import Creatable from 'react-select/creatable'
import { Controller } from "react-hook-form";
import { SetStateAction } from 'react';
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
    setIsNew?: React.Dispatch<SetStateAction<boolean>>;
    name?: string;
    isDisabled?: boolean;
    isSearchable?: boolean;
    labelName?: string;
    valueName?: string;
    isLoading?: boolean;
    control: any
    onChange?: (value: any) => void;
    error: any;
    // validation?: (value: any) => any
}

export default function CreateSelectInput(props: ISelectInputProps) {
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
                rules={props.required ? {
                    required: `${props.label} is required`, validate: value => props?.required ? String(value?.value || "").length > 0 || `${props.label} is required` : true
                } : {}}
                defaultValue={props.defaultValue}
                render={({ field }) => (
                    <>
                        <Creatable
                            placeholder={props?.placeholder}
                            isDisabled={props?.isDisabled}
                            isSearchable={props?.isSearchable}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            value={props?.value}
                            {...field}
                            isLoading={props?.isLoading}
                            getOptionLabel={(data) => { return props?.labelName ? data[props?.labelName] : data?.label }}
                            getOptionValue={(data) => { return props?.valueName ? data[props?.valueName] : data?.value }}
                            onChange={(value) => {
                                props?.onChange && props?.onChange(value)
                                field.onChange(value)
                                if (value?.__isNew__) {
                                    props?.setIsNew && props.setIsNew(true)
                                } else {
                                    props?.setIsNew && props.setIsNew(false)
                                }
                            }}
                            styles={customStyles}
                            options={props?.options}
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
