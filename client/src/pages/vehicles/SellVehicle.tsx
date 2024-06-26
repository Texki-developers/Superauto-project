import { SetStateAction } from 'react';
import Header from '../../components/header/Header';
import SellVehicleForm from '../../components/vehicles/SellVehicleForm';

interface IProps {
  setShowSellPage: React.Dispatch<SetStateAction<boolean>>;
}
const SellVehicle = ({ setShowSellPage }: IProps) => {
  const onCancelClick = () => {
    setShowSellPage(false);
  };
  const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'Vehicles', link: '/vehicles' },
    { name: 'Sell Vehicles' },
  ];
  return (
    <div>
      <Header breadCrumbData={breadCrumbData} />
      <div className='pt-5 mb-3'>
        <form action="">
          <SellVehicleForm onCancelClick={onCancelClick} />
        </form>
      </div>
    </div>
  );
};

export default SellVehicle;
