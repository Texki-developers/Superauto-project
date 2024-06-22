import { useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/addAndSearchItem';
import Header from '../../components/header/header';
import ModalWrapper from '../../components/modalWrapper';
import AddFinance from './addFinance';
import Table from '../../components/table/table';
import { ColumnData, dummyData } from './finance.data';

const Finance = () => {
  const [showAddFinancerPopup, setShowAddFinancerPopup] = useState(false);
  const onAddItemClick = () => {
    setShowAddFinancerPopup(true);
  };

  return (
    <div>
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
      <section className='pt-5'>
        <Table data={dummyData} columnData={ColumnData} />
      </section>
    </div>
  );
};

export default Finance;
