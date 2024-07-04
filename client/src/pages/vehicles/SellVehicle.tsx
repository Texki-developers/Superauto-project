/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from 'react';
import Header from '../../components/header/Header';
import SellVehicleForm from '../../components/vehicles/SellVehicleForm';
import { ISellVehicleApiBody, IVehicleSellFormValues } from '../../types/vehicle/sellVehicle';
import { useForm } from 'react-hook-form';
import ExchangeVehicle from './ExchangeVehicle/ExchangeVehicle';
import useToast from '../../hooks/useToast.hook';
import AuthApiService from '../../services/api-services';

interface IProps {
  setShowSellPage: React.Dispatch<SetStateAction<boolean>>;
}

const defaultValues: IVehicleSellFormValues = {
  customer: '',  // Default values for all fields
  saleRate: '',
  mrp: '5454',
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
  const { register, handleSubmit, reset, setValue, formState: { errors }, control } = useForm({
    defaultValues
  })
  const [showExchangeForm, setShowExchangeForm] = useState(false);
  const { toastError, toastLoading, toastSuccess } = useToast()

  const onCancelClick = () => {
    setShowSellPage(false);
  };
  const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'Vehicles', link: '/vehicles' },
    { name: 'Sell Vehicles' },
  ];
  const onSubmit = async (data: any) => {
    console.log(data);
    const id = toastLoading('Loading...');

    // Create the API body by transforming the form data
    const apiBody = {
      accountId: "", // Leave this empty for now
      soldRate: `${data?.saleRate} `,
      soldDate: data?.salesDate,
      paymentMode: data?.paymentType.label,
      financeAmound: data?.financeAmount || "0", // Use "0" if financeAmount is empty
      financeCharge: data?.financeServiceCharge || "0", // Use "0" if financeServiceCharge is empty
      regNum: data?.registrationNumber,
      soldVehicleId: "",
      isFinance: data?.financeServiceCharge && data?.financeAmount,
      is_exchange: false,
      rate: `${data?.rate}%`,
      amount: data?.paymentAmount,
      due_date: data?.dueDate
    };

    try {
      console.log(apiBody);
      const response = await AuthApiService.postApi<ISellVehicleApiBody, any>('inventory/sell/vehicle', apiBody);
      if (response?.status === "error") {
        toastError(id, response?.message);
        return;
      }
      setShowSellPage(false);
      toastSuccess(id, 'Vehicle added successfully');
    } catch (error) {
      setShowSellPage(false);
      toastError(id, 'Something went wrong');
    }
  };

  return (
    <div>
      <Header breadCrumbData={breadCrumbData} />
      <div className='pt-5 mb-3'>
        {
          showExchangeForm ? <ExchangeVehicle showPopup={setShowExchangeForm} /> :
            <form onSubmit={handleSubmit(onSubmit)}>
              <SellVehicleForm setValue={setValue} setShowExchangeForm={setShowExchangeForm} register={register} reset={reset} errors={errors} control={control} onCancelClick={onCancelClick} />
            </form>
        }
      </div>
    </div>
  );
};

export default SellVehicle;
