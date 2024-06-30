import { SetStateAction } from 'react';
import Header from '../../components/header/Header';
import AddvehicleForm from '../../components/vehicles/AddVehicleForm';
import { useForm } from 'react-hook-form';
import { IVehicleAddFormValues } from '../../types/vehicle/addVehicle';

interface IProps {
  setShowAddPage: React.Dispatch<SetStateAction<boolean>>;
}

const defaultValues: IVehicleAddFormValues = {
  party: '',
  registrationNumber: '',
  model: '',
  purchaseRate: '',
  balance: '',
  purchaseDate: '',
  insurance: '',
  proof: '',
  rcBook: '',
  ownership: '',
  brand: '',
  yearOfManufacture: 2024,
  purchaseAmount: '',
  insuranceDate: '',
  deliveryService: '',
  deliveryAmount: '',
};

const AddVehicle = ({ setShowAddPage }: IProps) => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors }, control } = useForm({
    defaultValues
  })
  const onCancelClick = () => {
    setShowAddPage(false);
  };
  const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'Vehicles' },
    { name: 'Add Vehicles' },
  ];
  const onSubmit = (data: IVehicleAddFormValues) => {
    console.log(data)
  }
  console.log(errors, "errorsssssss")
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
