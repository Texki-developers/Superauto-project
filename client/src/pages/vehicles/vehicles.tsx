import { useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/addAndSearchItem';
import Header from '../../components/header/header';
import AddVehicle from './addVehicle';

const Vehicles = () => {
  const [showAddPage, setShowAddPage] = useState<boolean>(false);
  const onAddButtonClick = () => {
    setShowAddPage(true);
  };

  return (
    <main>
      {!showAddPage ? (
        <>
          <Header />
          <div className='pt-[50px]'>
            <AddAndSearchItem addButtonText='Add Vehicle' onAddButtonClick={onAddButtonClick} />
          </div>
        </>
      ) : (
        <AddVehicle setShowAddPage={setShowAddPage} />
      )}
      {/* <ModalWrapper>dov</ModalWrapper> */}
    </main>
  );
};

export default Vehicles;
