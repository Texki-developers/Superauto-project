import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import Button from '../button.tsx/Button';
import DragAndDrop from '../formComponents/dragAndDrop/DragAndDrop';
import InputBox from '../formComponents/inputBox/InputBox';
import SelectInput from '../formComponents/selectInput/SelectInput';
import { IVehicleAddFormValues } from '../../types/vehicle/addVehicle';
import CreateSelectInput from '../formComponents/creatableSelect/CreatableSelect';

interface IProps {
  onCancelClick: () => void;
  register: UseFormRegister<IVehicleAddFormValues>;
  control: Control<IVehicleAddFormValues>;
  errors: FieldErrors<IVehicleAddFormValues>;
  reset: (values?: IVehicleAddFormValues) => void;
  watch: (name: keyof IVehicleAddFormValues) => IVehicleAddFormValues[keyof IVehicleAddFormValues]; // Watch function for watching form values
  setValue: (
    name: keyof IVehicleAddFormValues,
    value: IVehicleAddFormValues[keyof IVehicleAddFormValues],
    options?: {
      shouldValidate?: boolean;
      shouldDirty?: boolean;
    }
  ) => void; // SetValue function for setting form values
}

const AddvehicleForm = ({ onCancelClick, register, reset, control, errors, watch, setValue }: IProps) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <div className='bg-white-100 grid w-full grid-rows-[1fr_80px] rounded p-5'>
      <div className='grid h-full w-full grid-cols-[1fr_300px] gap-3'>
        <div className='grid gap-4'>
          <h1 className='primary-heading'>Vehicle Details</h1>
          <div className='grid grid-cols-2 gap-3'>
            <div className='first-section grid gap-3'>
              <div className='form-items grid gap-2'>
                <SelectInput
                  name='party'
                  label='Party'
                  isSearchable
                  placeholder='Select Party Name'
                  options={options}
                  control={control}
                  error={errors}
                  required
                />
                <InputBox
                  name='registrationNumber'
                  label='Registration Number'
                  placeholder='Enter Registration Number'
                  register={register}
                  error={errors}
                  required
                />
                <CreateSelectInput
                  name='model'
                  label='Model'
                  isSearchable
                  options={options}
                  placeholder='Select Model'
                  control={control}
                  error={errors}
                  required
                />
                <InputBox
                  name='purchaseRate'
                  label='Purchase Rate'
                  placeholder='Enter Purchase Rate'
                  type='number'
                  register={register}
                  error={errors}
                  required
                />
                <InputBox
                  name='balance'
                  label='Balance'
                  placeholder='Enter Balance'
                  type='number'
                  register={register}
                  error={errors}
                />
                <InputBox
                  name='purchaseDate'
                  label='Purchase Date'
                  placeholder='Select Purchase Date'
                  type='date'
                  register={register}
                  error={errors}
                  required
                />
              </div>
            </div>
            <div>
              <div className='second-section grid gap-2'>
                <InputBox
                  name='ownership'
                  label='Ownership'
                  placeholder='Enter Vehicle Ownership Name'
                  register={register}
                  error={errors}
                  required
                />
                <CreateSelectInput
                  name='brand'
                  label='Brand'
                  isSearchable
                  placeholder='Select Brand'
                  options={options}
                  control={control}
                  error={errors}
                  required
                />
                <InputBox
                  name='yearOfManufacture'
                  label='Year of Manufacture'
                  placeholder='Enter Year of Manufacture'
                  type='number'
                  register={register}
                  error={errors}
                  defaultValue={'2024'}
                  required
                />
                <InputBox
                  name='purchaseAmount'
                  label='Purchase Amount'
                  placeholder='Enter Purchase Amount'
                  type='number'
                  register={register}
                  error={errors}
                  required
                />
                <InputBox
                  name='insuranceDate'
                  label='Insurance Date'
                  placeholder='Select Insurance Date'
                  type='date'
                  register={register}
                  error={errors}
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className='primary-heading'>Delivery Services</h1>
            <div className='grid grid-cols-2 gap-3 pt-1'>
              <SelectInput
                name='deliveryService'
                label='Delivery Service'
                placeholder='Select Delivery Service'
                options={options}
                control={control}
                error={errors}
              />
              <InputBox
                name='deliveryAmount'
                label='Delivery Amount'
                placeholder='Enter Delivery Amount'
                type='number'
                register={register}
                error={errors}
              />
            </div>
          </div>
        </div>
        <div className='documents'>
          <h1 className='primary-heading'>Documents</h1>
          <div className='grid gap-2 pt-3'>
            <DragAndDrop watchValue={watch('rcBook')} setValue={setValue} name='rcBook' label='RC Book' />
            <DragAndDrop watchValue={watch('insurance')} setValue={setValue} name='insurance' label='Insurance' />
            <DragAndDrop watchValue={watch('proof')} setValue={setValue} name='proof' label='Proof' />
          </div>
        </div>
      </div>
      <div>
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
    </div>
  );
};

export default AddvehicleForm;
