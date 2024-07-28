import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import Button from '../button.tsx/Button';
import DragAndDrop from '../formComponents/dragAndDrop/DragAndDrop';
import InputBox from '../formComponents/inputBox/InputBox';
import { IBranAndModel, IVehicleAddFormValues } from '../../types/vehicle/addVehicle';
import CreateSelectInput from '../formComponents/creatableSelect/CreatableSelect';
import { SetStateAction, useEffect, useState } from 'react';
import useGetDropdownData from '../../hooks/useGetDropdownData.hook';
import { ICategory } from '../../types/apimodal/apimodal.d';
import CheckBox from '../formComponents/checkBox/CheckBox';

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
  brands?: IBranAndModel[] | undefined;
  brandLoading?: boolean
  isEdit?: boolean;
  setOpenStocks?: React.Dispatch<SetStateAction<boolean>>;
  hideDeliveryServices?: boolean
}

const AddvehicleForm = ({ setOpenStocks: setOpenStockFromProps, onCancelClick, isEdit, hideDeliveryServices, register, reset, control, errors, watch, setValue, brands, brandLoading }: IProps) => {
  const [isNewParty, setIsNewParty] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modelsData, setModelsData] = useState<any>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [brandData, setBrandData] = useState<any>([])
  const [isNewDelivery, setIsNewDelivery] = useState(false)
  const [openingStocks, setOpeningStocks] = useState<boolean>(false)

  // useEffect(() => {
  //   if (!canEdit) {

  //   }
  // }, [watch('brand'), canEdit])
  const onBrandChange = (item: {
    id: string; value: string, label: string, __isNew?: string
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const brand: any = item
    setValue('model', '')
    if (brands && brands?.length > 0) {
      const models = Array.from(new Set(brands?.filter(item => {
        return item.brand === brand.value;
      }).map(item => item.model)))
        .map(model => ({ id: item?.id, value: model, label: model }));
      setModelsData(models)
    }
  }

  useEffect(() => {
    if (brands && brands.length > 0) {
      const brandOptionsMap = new Map();
      brands.forEach((item: IBranAndModel) => {
        brandOptionsMap.set(item.brand, { id: item?.brand_model_id, label: item.brand, value: item.brand });
      });
      const brandOptions = Array.from(brandOptionsMap.values());
      setBrandData(brandOptions);
    }

  }, [brands])

  useEffect(() => {
    console.log(watch('party'))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!watch('party')?.value && isEdit) {
      setOpeningStocks(true)
    } else {
      setOpeningStocks(false)
    }
  }, [isEdit, watch('party')])

  const { formatedData: brokers, isPending: brokerPending } = useGetDropdownData(ICategory.BROKER)
  const { formatedData: deliveryService, isPending: deliveryServicePending } = useGetDropdownData(ICategory.DELIVERY_SERVICE)

  return (
    <>
      {!isEdit && <div className="py-5">
        <CheckBox onChange={(e) => { setOpenStockFromProps && setOpenStockFromProps(e.target.checked); setOpeningStocks(e.target.checked) }} label='Open Stocks' error={errors} name='openStocks' />
      </div>}

      <div className='bg-white-100 grid w-full grid-rows-[1fr_80px] rounded p-5'>
        <div className='grid h-full w-full grid-cols-[1fr_300px] gap-3'>
          <div className='grid gap-4'>
            <h1 className='primary-heading'>Vehicle Details</h1>
            <div className='grid grid-cols-2 gap-3'>
              <div className='first-section grid gap-3'>
                <div className='form-items grid gap-2'>
                  {!openingStocks && <CreateSelectInput
                    name='party'
                    label='Party'
                    isSearchable
                    placeholder='Select Party Name'
                    options={brokers}
                    isLoading={brokerPending}
                    control={control}
                    setIsNew={setIsNewParty}
                    // validation={(value) => {
                    //   return  || 'Party Name is required'
                    // }}
                    error={errors}
                    required
                  />}
                  {
                    isNewParty &&
                    < InputBox
                      name='partyPhoneNumber'
                      label='Phone Number'
                      placeholder='Enter Phone Number'
                      register={register}
                      error={errors}
                      required
                    />
                  }
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
                    options={modelsData}
                    placeholder='Select Model'
                    control={control}
                    error={errors}
                    onChange={(data) => {
                      console.log({ data })
                      data?.id && setValue('brandModel_id', data?.id)
                    }}
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
                    isDisabled
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
                  {openingStocks && <CreateSelectInput
                    name='brand'
                    label='Brand'
                    onChange={onBrandChange}
                    isSearchable
                    placeholder='Select Brand'
                    options={brandData}
                    isLoading={brandLoading}
                    control={control}
                    error={errors}
                    required
                  />}
                  <InputBox
                    name='ownership'
                    label='Ownership'
                    placeholder='Enter Vehicle Ownership Name'
                    register={register}
                    error={errors}
                    required
                  />
                  {!openingStocks && <CreateSelectInput
                    name='brand'
                    label='Brand'
                    onChange={onBrandChange}
                    isSearchable
                    placeholder='Select Brand'
                    options={brandData}
                    isLoading={brandLoading}
                    control={control}
                    error={errors}
                    required
                  />}
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
                  {!openingStocks && <InputBox
                    name='purchaseAmount'
                    label='Purchase Amount'
                    placeholder='Enter Purchase Amount'
                    type='number'
                    register={register}
                    error={errors}
                    required
                  />}
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
            {!hideDeliveryServices && !openingStocks && <div>
              <h1 className='primary-heading'>Delivery Services</h1>
              <div className='grid grid-cols-2 gap-3 pt-1'>
                <CreateSelectInput
                  name='deliveryService'
                  label='Delivery Service'
                  placeholder='Select Delivery Service'
                  options={deliveryService}
                  setIsNew={setIsNewDelivery}
                  control={control}
                  isLoading={deliveryServicePending}
                  error={errors}
                />
                {
                  isNewDelivery &&
                  <InputBox
                    name='deliveryServicePhoneNumber'
                    label='Phone Number'
                    placeholder='Delivery Service Phone Number'
                    type='number'
                    required
                    register={register}
                    error={errors}
                  />
                }
                <InputBox
                  name='deliveryAmount'
                  label='Delivery Amount'
                  placeholder='Enter Delivery Amount'
                  type='number'
                  register={register}
                  error={errors}
                />
              </div>
            </div>}
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
              onClick={() => { reset(); setOpeningStocks(false) }}
            />
            <div className='save-cancel-btn flex gap-3'>
              <Button
                onClick={() => {
                  onCancelClick();
                }}
                type='button'
                w='150px'
                className='bg-failureRed'
                text='Cancel'
              />
              <Button bg='primary' type='submit' w='150px' text='Save' />
            </div>
          </div>
        </div>
      </div></>
  );
};

export default AddvehicleForm;
