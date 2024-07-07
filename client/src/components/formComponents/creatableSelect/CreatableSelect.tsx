/* eslint-disable @typescript-eslint/no-explicit-any */
import Creatable from 'react-select/creatable'
import { Controller } from "react-hook-form";
import { SetStateAction } from 'react';
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
    setIsNew?: React.Dispatch<SetStateAction<boolean>>;
    name?: string;
    isDisabled?: boolean;
    isSearchable?: boolean;
    isLoading?: boolean;
    control: any
    error: any
}

export default function CreateSelectInput(props: ISelectInputProps) {

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
                        <Creatable
                            placeholder={props?.placeholder}
                            isDisabled={props?.isDisabled}
                            isSearchable={props?.isSearchable}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            value={props?.value}
                            {...field}
                            isLoading={props?.isLoading}
                            onChange={(value) => {
                                field.onChange(value)
                                if (value?.__isNew__) {
                                    props?.setIsNew && props.setIsNew(true)
                                } else {
                                    props?.setIsNew && props.setIsNew(false)
                                }
                            }}
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
