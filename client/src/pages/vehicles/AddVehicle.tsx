import { SetStateAction, useEffect } from 'react';
import Header from '../../components/header/Header';
import AddvehicleForm from '../../components/vehicles/AddVehicleForm';
import { useForm } from 'react-hook-form';
import { IBranAndModel, IVehicleAddFormValues } from '../../types/vehicle/addVehicle';
import AuthApiService from '../../services/api-services';
import useToast from '../../hooks/useToast.hook';
import useGetApis from '../../hooks/useGetApi.hook';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  setShowAddPage: React.Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}

const defaultValues: IVehicleAddFormValues = {
  party: {
    value: '',
    label: '',
  },
  registrationNumber: '',
  model: {
    label: '',
    value: '',
  },
  purchaseRate: '',
  balance: '',
  purchaseDate: '',
  insurance: null,
  proof: null,
  rcBook: null,
  ownership: '',
  brand: {
    value: '',
    label: '',
  },
  yearOfManufacture: '2024',
  purchaseAmount: '',
  insuranceDate: '',
  deliveryService: {
    value: '',
    label: '',
  },
  deliveryAmount: '',
  partyPhoneNumber: '',
  deliveryServicePhoneNumber: ''
};

const AddVehicle = ({ setShowAddPage, refetch }: IProps) => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors }, control } = useForm({
    defaultValues
  })
  const { toastError, toastLoading, toastSuccess } = useToast()

  const { callApi } = useGetApis()
  const url = `inventory/model-brand/vehicle`
  const fetchBrandModal = (): Promise<{ data: IBranAndModel[] } | undefined> => callApi(url)
  const { data: brandData, isPending: brandLoading } = useQuery({ queryKey: ['brand/model-brand'], queryFn: fetchBrandModal })
  useEffect(() => {

  }, [])
  const onCancelClick = () => {
    setShowAddPage(false);
  };
  const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'Vehicles' },
    { name: 'Add Vehicles' },
  ];
  const onSubmit = async (data: IVehicleAddFormValues) => {
    const formData = new FormData();
    formData.append(data?.party.__isNew__ ? 'partyName' : 'accountId', data?.party.value)
    formData.append('ownershipName', data.ownership);
    formData.append('registrationNumber', data.registrationNumber);
    formData.append('brandModel_id', 'null'); // You can update this value as needed
    formData.append('yearOfManufacture', data.yearOfManufacture);
    formData.append('purchaseRate', data.purchaseRate);
    formData.append('saleStatus', 'false');
    formData.append('insuranceDate', data.insuranceDate);
    formData.append(data?.deliveryService.__isNew__ ? 'deliveryName' : 'deliveryService', data.deliveryService.value);
    formData.append('deliveryAmount', data.deliveryAmount);
    data.rcBook && formData.append('rcBook', data.rcBook);
    data.insurance && formData.append('insuranceDoc', data.insurance);
    data.proof && formData.append('proofDoc', data.proof);
    formData.append('dateOfPurchase', data.purchaseDate);
    formData.append('model', data.model.value);
    formData.append('brand', data.brand.value);
    formData.append('salesReturn', "false");
    formData.append('isDelivery', `${!!data?.deliveryService.value}`);
    formData.append('isNew', data?.brand?.__isNew__ ? 'true' : 'false');
    data?.deliveryServicePhoneNumber?.length > 0 && data?.deliveryService.__isNew__ && formData.append('deliveryServicePhoneNumber', data?.deliveryServicePhoneNumber)
    data?.partyPhoneNumber?.length > 0 && data?.party.__isNew__ && formData.append('partyPhoneNumber', data?.partyPhoneNumber)
    const id = toastLoading('Loading...');
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await AuthApiService.postApiFormData<FormData, any>('inventory/add/vehicle', formData,)
      if (data?.status === "error") {
        toastError(id, data?.message)
        return
      }
      toastSuccess(id, 'Vehicle added successfully')
      setShowAddPage(false)
    } catch (error) {
      toastError(id, 'Something went wrong')
    } finally {
      refetch()
    }
  }
  return (
    <div>
      <Header breadCrumbData={breadCrumbData} />
      <div className='pt-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddvehicleForm brands={brandData?.data} brandLoading={brandLoading} reset={reset} setValue={setValue} watch={watch} register={register} control={control} errors={errors} onCancelClick={onCancelClick} />
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
