import { useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddServiceShop from './AddServiceShop';
import { ColumnData, dummyData } from './serviceShop.data';
import Table from '../../components/table/Table';

const ServiceShop = () => {
  const [showServiceShopPopup, setShowServiceShopPopup] = useState(false);
  const onAddItemClick = () => {
    setShowServiceShopPopup(true);
  };
  return (
    <>
      {showServiceShopPopup && (
        <ModalWrapper
          onClose={() => {
            setShowServiceShopPopup(false);
          }}
          title='Add Service Shop'
        >
          <AddServiceShop />
        </ModalWrapper>
      )}
      <div className='table-wrapper'>
        <Header />
        <section className='pt-[50px]'>
          <AddAndSearchItem
            addButtonText='Add Service Shop'
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

export default ServiceShop;
