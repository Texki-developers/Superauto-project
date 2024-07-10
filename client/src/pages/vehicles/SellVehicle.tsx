/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import SellVehicleForm from '../../components/vehicles/SellVehicleForm';
import { IExchangeVehicleDetails, IVehicleSellFormValues } from '../../types/vehicle/sellVehicle';
import { useForm } from 'react-hook-form';
import ExchangeVehicle from './ExchangeVehicle/ExchangeVehicle';
import useToast from '../../hooks/useToast.hook';
import AuthApiService from '../../services/api-services';

interface IProps {
  setShowSellPage: React.Dispatch<SetStateAction<boolean>>;
  vehicleId: string;
  refetch: () => void;
  mrp?: string | undefined;
}

const defaultValues: IVehicleSellFormValues = {
  customer: {
    value: '',
    label: '',
  },  // Default values for all fields
  saleRate: '',
  mrp: '',
  salesDate: '',
  paymentType: {
    value: '',
    label: '',
  },
  financeAmount: '',
  customerPhoneNumber: '',
  financeServiceCharge: '',
  registrationNumber: '',
  rate: null,
  paymentAmount: '',
  dueDate: '',
  balance: ''
};

const SellVehicle = ({ setShowSellPage, vehicleId, refetch, mrp }: IProps) => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors }, control } = useForm({
    defaultValues
  })
  const [showExchangeForm, setShowExchangeForm] = useState(false);
  const { toastError, toastLoading, toastSuccess } = useToast()
  const [showFinance, setShowFinance] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [exchangeDet, setExchangeDet] = useState<IExchangeVehicleDetails | null>(null)
  const onCancelClick = () => {
    setShowSellPage(false);
  };
  useEffect(() => {
    setValue('mrp', mrp ?? '')
  }, [])
  const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'Vehicles', link: '/vehicles' },
    { name: 'Sell Vehicles' },
  ];
  const onSubmit = async (data: IVehicleSellFormValues) => {
    console.log(data);
    const id = toastLoading('Loading...');

    const apiBody: any = {
      soldRate: Number(data?.saleRate),
      soldDate: data?.salesDate,
      paymentMode: data?.paymentType.label,
      soldVehicleId: Number(vehicleId),
      isFinance: showFinance ? true : false,
      exchangeVehicleId: exchangeDet,
      is_exchange: !!exchangeDet,
      rate: Number(data?.rate),
      amount: Number(data?.paymentAmount),
      due_date: data?.dueDate,
      finance_charge: Number(data?.financeServiceCharge),
      finance_amount: Number(data?.financeAmount),
    };
    if (data?.customer?.__isNew__) {
      apiBody['customerPhoneNumber'] = data?.customerPhoneNumber
      apiBody['customerName'] = data?.customer.label;
    } else {
      apiBody['accountId'] = Number(data?.customer?.value)
    }

    try {
      console.table(apiBody);
      const response = await AuthApiService.postApi<any, any>('inventory/sell/vehicle', apiBody);
      if (response?.status === "error") {
        toastError(id, response?.message);
        return;
      }
      setShowSellPage(false);
      toastSuccess(id, 'Vehicle added successfully');
      refetch()
    } catch (error) {
      setShowSellPage(false);
      toastError(id, 'Something went wrong');
    }
  };
  useEffect(() => {
    exchangeDet?.regNumb && setValue('registrationNumber', exchangeDet.regNumb)
    exchangeDet?.rate && setValue('rate', exchangeDet.rate)
  }, [exchangeDet])

  useEffect(() => {
    const salesRate = watch('saleRate')
    const financeAmount = watch('financeAmount')
    const financeServiceCharge = watch('financeServiceCharge')
    setTotal(Number(salesRate ?? 0) + Number(financeAmount ?? 0) + Number(financeServiceCharge ?? 0))
  }, [watch('saleRate'), watch('financeAmount'), watch('financeServiceCharge')])

  useEffect(() => {
    const salesRate = watch('saleRate')
    const paymentAmount = watch('paymentAmount')
    if (salesRate || paymentAmount) {
      setValue('balance', `${Number(salesRate ?? 0) - Number(paymentAmount ?? 0)}`)
    }
  }, [watch('saleRate'), watch('paymentAmount')])
  return (
    <div>
      <Header breadCrumbData={breadCrumbData} />
      <div className='pt-5 mb-3'>
        {
          showExchangeForm ? <ExchangeVehicle setExchangeDet={setExchangeDet} showPopup={setShowExchangeForm} /> :
            <form onSubmit={handleSubmit(onSubmit)}>
              <SellVehicleForm total={total} setShowFinance={setShowFinance} showFinance={showFinance} setValue={setValue} setShowExchangeForm={setShowExchangeForm} register={register} reset={reset} errors={errors} control={control} onCancelClick={onCancelClick} />
            </form>
        }
      </div>
    </div>
  );
};

export default SellVehicle;
