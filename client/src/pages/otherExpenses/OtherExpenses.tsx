import { useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddOtherExpenses from './AddOtherExpenses';
import { ColumnData, dummyData } from './otherExpenses.data';
import Table from '../../components/table/Table';

const OtherExpenses = () => {
  const [showOtherExpensesPopup, setShowOtherExpensesPopup] = useState(false);
  const onAddItemClick = () => {
    setShowOtherExpensesPopup(true);
  };
  return (
    <>
      {showOtherExpensesPopup && (
        <ModalWrapper
          onClose={() => {
            setShowOtherExpensesPopup(false);
          }}
          title='Add Other Expenses'
        >
          <AddOtherExpenses />
        </ModalWrapper>
      )}
      <div className='table-wrapper'>
        <Header />
        <section className='pt-[50px]'>
          <AddAndSearchItem
            addButtonText='Add Other Expenses'
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

export default OtherExpenses;
