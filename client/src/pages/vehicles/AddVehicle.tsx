import { SetStateAction } from 'react';
import Header from '../../components/header/Header';
import AddvehicleForm from '../../components/vehicles/AddVehicleForm';
import { useForm } from 'react-hook-form';
import { IVehicleAddFormValues } from '../../types/vehicle/addVehicle';
import AuthApiService from '../../services/api-services';
import useToast from '../../hooks/useToast.hook';

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
};

const AddVehicle = ({ setShowAddPage, refetch }: IProps) => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors }, control } = useForm({
    defaultValues
  })
  const { toastError, toastLoading, toastSuccess } = useToast()
  const onCancelClick = () => {
    setShowAddPage(false);
  };
  const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'Vehicles' },
    { name: 'Add Vehicles' },
  ];
  const onSubmit = async (data: IVehicleAddFormValues) => {
    console.log(data)
    const formData = new FormData();
    formData.append('accountId', '10');
    formData.append('ownershipName', data.ownership);
    formData.append('registrationNumber', data.registrationNumber);
    formData.append('brandModel_id', 'null'); // You can update this value as needed
    formData.append('yearOfManufacture', data.yearOfManufacture);
    formData.append('purchaseRate', data.purchaseRate);
    formData.append('saleStatus', 'false');
    formData.append('insuranceDate', data.insuranceDate);
    formData.append('deliveryService', data.deliveryService.value);
    formData.append('deliveryAmount', data.deliveryAmount);
    data.rcBook && formData.append('rcBook', data.rcBook);
    data.insurance && formData.append('insuranceDoc', data.insurance);
    data.proof && formData.append('proofDoc', data.proof);
    formData.append('dateOfPurchase', data.purchaseDate);
    formData.append('model', data.model.value);
    formData.append('brand', data.brand.value);
    formData.append('isNew', data?.brand?.__isNew__ ? 'true' : 'false');
    const id = toastLoading('Loading...');
    try {
      const data = await AuthApiService.postApiFormData<FormData, any>('inventory/add/vehicle', formData,)
      console.log(data)
      if (data?.status === "error") {
        toastError(id, data?.message)
        return
      }
      toastSuccess(id, 'Vehicle added successfully')
    } catch (error) {
      toastError(id, 'Something went wrong')
    } finally {
      setShowAddPage(false)
      refetch()
    }
  }
  return (
    <div>
      <Header breadCrumbData={breadCrumbData} />
      <div className='pt-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddvehicleForm reset={reset} setValue={setValue} watch={watch} register={register} control={control} errors={errors} onCancelClick={onCancelClick} />
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
