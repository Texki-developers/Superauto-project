/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from 'react';
import Header from '../../components/header/Header';
import SellVehicleForm from '../../components/vehicles/SellVehicleForm';
import { IVehicleSellFormValues } from '../../types/vehicle/sellVehicle';
import { useForm } from 'react-hook-form';
import ExchangeVehicle from './ExchangeVehicle/ExchangeVehicle';

interface IProps {
  setShowSellPage: React.Dispatch<SetStateAction<boolean>>;
}

const defaultValues: IVehicleSellFormValues = {
  customer: '',  // Default values for all fields
  saleRate: '',
  mrp: '',
  salesDate: '',
  paymentType: '',
  financeAmount: '',
  financeServiceCharge: '',
  registrationNumber: '',
  rate: '',
  paymentAmount: '',
  dueDate: '',
  balance: ''
};

const SellVehicle = ({ setShowSellPage }: IProps) => {
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  })
  const [showExchangeForm, setShowExchangeForm] = useState(false);

  const onCancelClick = () => {
    setShowSellPage(false);
  };
  const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'Vehicles', link: '/vehicles' },
    { name: 'Sell Vehicles' },
  ];
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <div>
      <Header breadCrumbData={breadCrumbData} />
      <div className='pt-5 mb-3'>
        {
          showExchangeForm ? <ExchangeVehicle showPopup={setShowExchangeForm} /> :
            <form onSubmit={handleSubmit(onSubmit)}>
              <SellVehicleForm setShowExchangeForm={setShowExchangeForm} register={register} reset={reset} errors={errors} control={control} onCancelClick={onCancelClick} />
            </form>
        }
      </div>
    </div>
  );
};

export default SellVehicle;
