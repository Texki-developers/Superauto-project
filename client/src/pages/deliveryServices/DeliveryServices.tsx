import { useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddDeliveryServices from './AddDeliveryServices';
import { ColumnData, dummyData } from './deliveryServices.data';
import Table from '../../components/table/Table';

const DeliveryServices = () => {
  const [showDeliveryServicesPopup, setShowDeliveryServicesPopup] = useState(false);
  const onAddItemClick = () => {
    setShowDeliveryServicesPopup(true);
  };
  return (
    <>
      {showDeliveryServicesPopup && (
        <ModalWrapper
          onClose={() => {
            setShowDeliveryServicesPopup(false);
          }}
          title='Add Delivery Services'
        >
          <AddDeliveryServices />
        </ModalWrapper>
      )}
      <div className='table-wrapper'>
        <Header />
        <section className='pt-[50px]'>
          <AddAndSearchItem
            addButtonText='Add Delivery Services'
            onAddButtonClick={onAddItemClick}
          />
        </section>
        <section className='pt-5 pb-2'>
          <Table data={dummyData} columnData={ColumnData} />
        </section>
      </div>
    </>
  );
};

export default DeliveryServices;
