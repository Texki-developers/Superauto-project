import { useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddCustomers from './AddCustomers';
import { ColumnData, dummyData } from './customers.data';
import Table from '../../components/table/Table';

const Customers = () => {
  const [showCustomersPopup, setShowCustomersPopup] = useState(false);
  const onAddItemClick = () => {
    setShowCustomersPopup(true);
  };
  return (
    <>
      {showCustomersPopup && (
        <ModalWrapper
          onClose={() => {
            setShowCustomersPopup(false);
          }}
          title='Add Customer'
        >
          <AddCustomers />
        </ModalWrapper>
      )}
      <div className='table-wrapper'>
        <Header />
        <section className='pt-[50px]'>
          <AddAndSearchItem
            addButtonText='Add Customer'
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

export default Customers;
