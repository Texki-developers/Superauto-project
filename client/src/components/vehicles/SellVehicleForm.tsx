import React, { SetStateAction, useState } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import Button from "../../components/button.tsx/Button";
import InputBox from "../../components/formComponents/inputBox/InputBox";
import SelectInput from "../../components/formComponents/selectInput/SelectInput";
import AddButton from '../../assets/icons/addButton.svg';
import CheckBox from "../formComponents/checkBox/CheckBox";
import { IVehicleSellFormValues } from '../../types/vehicle/sellVehicle';
import { ICategory } from '../../types/apimodal/apimodal.d';
import useGetDropdownData from '../../hooks/useGetDropdownData.hook';
import CreateSelectInput from '../formComponents/creatableSelect/CreatableSelect';
import { paymentTypes } from '../../config/paymentTypes.data';


interface IProps {
  setShowExchangeForm?: React.Dispatch<SetStateAction<boolean>>
  onCancelClick: () => void;
  register: UseFormRegister<IVehicleSellFormValues>;
  control: Control<IVehicleSellFormValues>;
  errors: FieldErrors<IVehicleSellFormValues>;
  reset: (values?: IVehicleSellFormValues) => void;
  setValue: (
    name: keyof IVehicleSellFormValues,
    value: IVehicleSellFormValues[keyof IVehicleSellFormValues],
    options?: {
      shouldValidate?: boolean;
      shouldDirty?: boolean;
    }
  ) => void; // SetValue function for setting form values
  showFinance?: boolean;
  total?: number,
  hideExchange?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: (name: keyof IVehicleSellFormValues) => IVehicleSellFormValues[keyof IVehicleSellFormValues] | any;
  setShowFinance?: React.Dispatch<SetStateAction<boolean>>;
  hideBalance?: boolean;
}

const SellVehicleForm = ({ hideBalance, setShowExchangeForm, onCancelClick, hideExchange, watch, register, reset, control, errors, total, setValue, showFinance, setShowFinance }: IProps) => {
  const [newCustomer, setNewCustomer] = useState(false)
  const { formatedData: customers, isPending: customerPending } = useGetDropdownData(ICategory.CUSTOMER)
  console.log(customers)
  return (
    <>
      {
        <div className='bg-white-100 grid w-full h-full grid-rows-[1fr_auto] rounded p-5'>
          <div className='grid h-full w-full grid-cols-2 gap-4'>
            <div className='col-span-2 grid gap-4'>
              <h1 className='primary-heading'>Basic Details</h1>
              <div className='grid grid-cols-3 gap-4'>
                <CreateSelectInput
                  name='customer'
                  label='Customer'
                  isSearchable
                  placeholder='Search customer name'
                  options={customers}
                  isLoading={customerPending}
                  control={control}
                  error={errors}
                  setIsNew={setNewCustomer}
                  required
                />
                {
                  newCustomer &&
                  <InputBox
                    name='customerPhoneNumber'
                    label='Phone Number'
                    placeholder='Customer Phone'
                    register={register}
                    error={errors}
                    type='tel'
                    required
                  />
                }
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
                  isDisabled
                  error={errors}
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
                  options={paymentTypes}
                  control={control}
                  error={errors}
                  required
                />
              </div>

              <div className="flex gap-2">
                <h1 className='primary-heading'>Finance Details</h1>
                <CheckBox checked={showFinance} onChange={(e) => {
                  if (!e.target.checked) {
                    setValue('financeAmount', '')
                    setValue('financeServiceCharge', '')
                  }
                  setShowFinance && setShowFinance(e.target.checked)
                }} error={errors} name='Finance' label="" />
              </div>
              {showFinance && <div className="grid grid-cols-[2fr_1fr]">
                <div className='grid grid-cols-2 gap-4'>
                  <InputBox
                    name='financeAmount'
                    label='Finance Amount'
                    placeholder='Value'
                    type='number'
                    register={register}
                    error={errors}
                    required
                  />
                  <InputBox
                    name='financeServiceCharge'
                    label='Finance Service Charge'
                    placeholder='Value'
                    required
                    type='number'
                    register={register}
                    error={errors}
                  />
                </div>
              </div>}

              {!hideExchange && <>
                <div className="flex justify-between">
                  <h1 className='primary-heading'>Exchange Details</h1>
                  {watch('customer')?.value && <div onClick={() => setShowExchangeForm && setShowExchangeForm(true)} className="cursor-pointer border-b-2 border-black-100 items-center flex gap-2">
                    <img className="w-[20px] h-[20px]" src={AddButton} alt="" />
                    <p className="font-semibold">Add Exchange Details</p>
                  </div>}
                </div>
                <div className="grid grid-cols-[2fr_1fr]">
                  <div className='grid grid-cols-2 gap-4'>
                    <InputBox
                      name='registrationNumber'
                      label='Registration Number'
                      placeholder='Registration Number'
                      register={register}
                      isDisabled
                      error={errors}
                    />
                    <InputBox
                      name='rate'
                      label='Rate'
                      placeholder='0'
                      type='number'
                      register={register}
                      isDisabled
                      error={errors}
                    />
                  </div>
                </div>
              </>}

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
                  required={watch('balance') != 0}
                />
                {!hideBalance && <InputBox
                  name='balance'
                  label='Balance'
                  placeholder='0'
                  isDisabled
                  type='number'
                  register={register}
                  error={errors}
                  required
                />}
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className='grand-total flex justify-end font-bold text-lg py-4'>
                Grand Total: {total}/-
              </div>
              <div className='button-wrapper flex h-full w-full items-center justify-between'>
                <Button
                  className='bg-gray-300 font-semibold text-black-400'
                  w='100px'
                  text='Reset'
                  type='button'
                  onClick={() => reset()}
                />
                <div className='save-cancel-btn flex gap-3'>
                  <Button
                    onClick={() => onCancelClick()}
                    w='150px'
                    className='bg-failureRed'
                    text='Cancel'
                    type='button'
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
        </div >
      }
    </>
  );
};

export default SellVehicleForm;
