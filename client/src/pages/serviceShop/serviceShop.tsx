import { useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/addAndSearchItem';
import Header from '../../components/header/header';
import ModalWrapper from '../../components/modalWrapper';
import AddServiceShop from './AddServiceShop';

const ServiceShop = () => {
  const [showServiceShopPopup, setShowServiceShopPopup] = useState(false);
  const onAddItemClick = () => {
    setShowServiceShopPopup(true);
  };
  return (
    <div>
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
      <Header />
      <section className='pt-[50px]'>
        <AddAndSearchItem
          addButtonText='Add Service Shop'
          onAddButtonClick={onAddItemClick}
        />
      </section>
    </div>
  );
};

export default ServiceShop;
