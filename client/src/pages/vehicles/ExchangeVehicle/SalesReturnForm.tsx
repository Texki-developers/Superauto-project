import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import Button from "../../../components/button.tsx/Button";
import InputBox from "../../../components/formComponents/inputBox/InputBox";
import { IVehicleNewFormValues } from "../../../types/vehicle/sellVehicle";
import CreateSelectInput from "../../../components/formComponents/creatableSelect/CreatableSelect";
interface IProps {
    onCancelClick: () => void;
    register: UseFormRegister<IVehicleNewFormValues>;
    control: Control<IVehicleNewFormValues>;
    errors: FieldErrors<IVehicleNewFormValues>;
    reset: (values?: IVehicleNewFormValues) => void;
}
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];


const SalesReturnForm = ({ onCancelClick, reset, register, control, errors, }: IProps) => {
    return (
        <div className="grid gap-3 ">
            <div className="grid grid-cols-2 gap-3 py-6">
                <CreateSelectInput
                    name="registrationNumber"
                    label='Registartion Number'
                    placeholder='Registartion Number'
                    options={options}
                    control={control}
                    error={errors}
                    required
                />
                <InputBox
                    name="value"
                    label='Value'
                    placeholder='Value'
                    required
                    register={register}
                    error={errors}
                    type='number'
                />
                <InputBox
                    name="purchaseDate"
                    label='Purchase Date'
                    placeholder='Purchase Date'
                    required
                    register={register}
                    error={errors}
                    type='date'
                />
            </div>
            <div className='button-wrapper flex h-full w-full items-center justify-between'>
                <Button
                    className='bg-gray-300 font-semibold text-black-400'
                    w='100px'
                    text='Reset'
                    type="button"
                    onClick={() => { reset() }}
                />
                <div className='save-cancel-btn flex gap-3'>
                    <Button
                        onClick={() => {
                            onCancelClick();
                        }}
                        w='150px'
                        className='bg-failureRed'
                        text='Cancel'
                    />
                    <Button bg='primary' w='150px' text='Save' />
                </div>
            </div>
        </div>
    )
}

export default SalesReturnForm