import { SetStateAction } from 'react';
import Header from '../../components/header/Header';
import AddvehicleForm from '../../components/vehicles/AddVehicleForm';

interface IProps {
  setShowAddPage: React.Dispatch<SetStateAction<boolean>>;
}
const AddVehicle = ({ setShowAddPage }: IProps) => {
  const onCancelClick = () => {
    setShowAddPage(false);
  };
  const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'Vehicles', link: '/vehicles' },
    { name: 'Add Vehicles' },
  ];
  return (
    <div>
      <Header breadCrumbData={breadCrumbData} />
      <div className='pt-5'>
        <AddvehicleForm onCancelClick={onCancelClick} />
      </div>
    </div>
  );
};

export default AddVehicle;
