import React, { SetStateAction } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import Button from "../../components/button.tsx/Button";
import InputBox from "../../components/formComponents/inputBox/InputBox";
import SelectInput from "../../components/formComponents/selectInput/SelectInput";
import AddButton from '../../assets/icons/addButton.svg';
import CheckBox from "../formComponents/checkBox/CheckBox";
import { IVehicleSellFormValues } from '../../types/vehicle/sellVehicle';


interface IProps {
  setShowExchangeForm: React.Dispatch<SetStateAction<boolean>>
  onCancelClick: () => void;
  register: UseFormRegister<IVehicleSellFormValues>;
  control: Control<IVehicleSellFormValues>;
  errors: FieldErrors<IVehicleSellFormValues>;
  reset: (values?: IVehicleSellFormValues) => void;
}

const SellVehicleForm = ({ setShowExchangeForm, onCancelClick, register, reset, control, errors }: IProps) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <>
      {
        <div className='bg-white-100 grid w-full h-full grid-rows-[1fr_auto] rounded p-5'>
          <div className='grid h-full w-full grid-cols-2 gap-4'>
            <div className='col-span-2 grid gap-4'>
              <h1 className='primary-heading'>Basic Details</h1>
              <div className='grid grid-cols-3 gap-4'>
                <SelectInput
                  name='customer'
                  label='Customer'
                  isSearchable
                  placeholder='Search customer name'
                  options={options}
                  control={control}
                  error={errors}
                  required
                />
                <InputBox
                  name='saleRate'
                  label='Sale Rate'
                  placeholder='Value'
                  type='number'
                  register={register}
                  error={errors}
                  required
                />
                <InputBox
                  name='mrp'
                  label='MRP'
                  placeholder='Value'
                  type='number'
                  register={register}
                  error={errors}
                  required
                />
                <InputBox
                  name='salesDate'
                  label='Sales Date'
                  placeholder='Date'
                  type='date'
                  register={register}
                  error={errors}
                  required
                />
                <SelectInput
                  name='paymentType'
                  label='Payment Type'
                  isSearchable
                  placeholder='Cash'
                  options={options}
                  control={control}
                  error={errors}
                  required
                />
              </div>

              <div className="flex gap-2">
                <h1 className='primary-heading'>Finance Details</h1>
                <CheckBox label="" />
              </div>
              <div className="grid grid-cols-[2fr_1fr]">
                <div className='grid grid-cols-2 gap-4'>
                  <InputBox
                    name='financeAmount'
                    label='Finance Amount'
                    placeholder='Value'
                    type='number'
                    register={register}
                    error={errors}
                  />
                  <InputBox
                    name='financeServiceCharge'
                    label='Finance Service Charge'
                    placeholder='Value'
                    type='number'
                    register={register}
                    error={errors}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <h1 className='primary-heading'>Exchange Details</h1>
                <div onClick={() => setShowExchangeForm(true)} className="cursor-pointer border-b-2 border-black-100 items-center flex gap-2">
                  <img className="w-[20px] h-[20px]" src={AddButton} alt="" />
                  <p className="font-semibold">Add Exchange Details</p>
                </div>
              </div>
              <div className="grid grid-cols-[2fr_1fr]">
                <div className='grid grid-cols-2 gap-4'>
                  <InputBox
                    name='registrationNumber'
                    label='Registration Number'
                    placeholder='KL55AE5570'
                    register={register}
                    error={errors}
                    required
                  />
                  <InputBox
                    name='rate'
                    label='Rate'
                    placeholder='0'
                    type='number'
                    register={register}
                    error={errors}
                  />
                </div>
              </div>

              <h1 className='primary-heading'>Payments</h1>
              <div className='grid grid-cols-3 gap-4'>
                <InputBox
                  name='paymentAmount'
                  label='Amount'
                  placeholder='Value'
                  type='number'
                  register={register}
                  error={errors}
                  required
                />
                <InputBox
                  name='dueDate'
                  label='Due Date'
                  placeholder='Date'
                  type='date'
                  register={register}
                  error={errors}
                  required
                />
                <InputBox
                  name='balance'
                  label='Balance'
                  placeholder='0'
                  type='number'
                  register={register}
                  error={errors}
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className='grand-total flex justify-end font-bold text-lg py-4'>
                Grand Total: 2237/-
              </div>
              <div className='button-wrapper flex h-full w-full items-center justify-between'>
                <Button
                  className='bg-gray-300 font-semibold text-black-400'
                  w='100px'
                  text='Reset'
                  onClick={() => reset()}
                />
                <div className='save-cancel-btn flex gap-3'>
                  <Button
                    onClick={() => onCancelClick()}
                    w='150px'
                    className='bg-failureRed'
                    text='Cancel'
                  />
                  <Button
                    bg='primary'
                    w='150px'
                    text='Save'
                    type='submit'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default SellVehicleForm;
