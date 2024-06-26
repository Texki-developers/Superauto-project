import { useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddFinance from './AddFinance';
import Table from '../../components/table/Table';
import { ColumnData, dummyData } from './finance.data';

const Finance = () => {
  const [showAddFinancerPopup, setShowAddFinancerPopup] = useState(false);
  const onAddItemClick = () => {
    setShowAddFinancerPopup(true);
  };

  return (
    <div className='table-wrapper'>
      {showAddFinancerPopup && (
        <ModalWrapper
          onClose={() => {
            setShowAddFinancerPopup(false);
          }}
          title='Add Financer'
        >
          <AddFinance />
        </ModalWrapper>
      )}
      <Header />
      <section className='pt-[50px]'>
        <AddAndSearchItem
          addButtonText='Add Financer'
          onAddButtonClick={onAddItemClick}
        />
      </section>
      <section className='pt-5 pb-2'>
        <Table data={dummyData} columnData={ColumnData} />
      </section>
    </div>
  );
};

export default Finance;
