import Button from "../../components/button.tsx/Button";
import InputBox from "../../components/formComponents/inputBox/InputBox";
import SelectInput from "../../components/formComponents/selectInput/SelectInput";
import AddButton from '../../assets/icons/addButton.svg'
import CheckBox from "../formComponents/checkBox/CheckBox";
import { useState } from "react";
import ExchangeVehicle from "../../pages/vehicles/ExchangeVehicle/ExchangeVehicle";

interface IProps {
  onCancelClick: () => void;
}

const SellVehicleForm = ({ onCancelClick }: IProps) => {
  const [showExchangeForm, setShowExchangeForm] = useState(false);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <>
      {
        showExchangeForm ? <ExchangeVehicle showPopup={setShowExchangeForm} /> :
          <div className='bg-white-100 grid w-full h-full grid-rows-[1fr_auto] rounded p-5'>
            <div className='grid h-full w-full grid-cols-2 gap-4'>
              <div className='col-span-2 grid gap-4'>
                <h1 className='primary-heading'>Basic Details</h1>
                <div className='grid grid-cols-3 gap-4'>
                  <SelectInput
                    label='Customer'
                    isSearchable
                    placeholder='Search customer name'
                    options={options}
                    onChange={(value) => { console.log(value); }}
                    required
                  />
                  <InputBox
                    label='Sale Rate'
                    placeholder='Value'
                    onChange={() => { }}
                    type='number'
                    required
                  />
                  <InputBox
                    label='MRP'
                    placeholder='Value'
                    onChange={() => { }}
                    type='number'
                    required
                  />
                  <InputBox
                    label='Sales Date'
                    placeholder='Date'
                    onChange={() => { }}
                    type='date'
                    required
                  />
                  <SelectInput
                    label='Payment Type'
                    isSearchable
                    placeholder='Cash'
                    options={options}
                    onChange={(value) => { console.log(value); }}
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
                      label='Finance Amount'
                      placeholder='Value'
                      onChange={() => { }}
                      type='number'
                    />
                    <InputBox
                      label='Finance Service Charge'
                      placeholder='Value'
                      onChange={() => { }}
                      type='number'
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <h1 className='primary-heading'>Exchange Details</h1>
                  <div onClick={() => {
                    setShowExchangeForm(true);
                  }} className=" cursor-pointer border-b-2 border-black-100 items-center flex gap-2">
                    <img className=" w-[20px] h-[20px] " src={AddButton} alt="" />
                    <p className="font-semibold">Add Exchange Details</p>
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_1fr]">
                  <div className='grid grid-cols-2 gap-4'>
                    <InputBox
                      label='Registration Number'
                      placeholder='KL55AE5570'
                      onChange={() => { }}
                      required
                    />
                    <InputBox
                      label='Rate'
                      placeholder='0'
                      onChange={() => { }}
                      type='number'
                    />
                  </div>
                </div>

                <h1 className='primary-heading'>Payments</h1>
                <div className='grid grid-cols-3 gap-4'>
                  <InputBox
                    label='Amount'
                    placeholder='Value'
                    onChange={() => { }}
                    type='number'
                    required
                  />
                  <InputBox
                    label='Due Date'
                    placeholder='Date'
                    onChange={() => { }}
                    type='date'
                    required
                  />
                  <InputBox
                    label='Balance'
                    placeholder='0'
                    onChange={() => { }}
                    type='number'
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
                  />
                  <div className='save-cancel-btn flex gap-3'>
                    <Button
                      onClick={() => { onCancelClick(); }}
                      w='150px'
                      className='bg-failureRed'
                      text='Cancel'
                    />
                    <Button bg='primary' w='150px' text='Save' />
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
