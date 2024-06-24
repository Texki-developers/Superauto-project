import { useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddEmployees from './AddEmployees';
import { ColumnData, dummyData } from './employees.data';
import Table from '../../components/table/Table';

const Employees = () => {
  const [showEmployeesPopup, setShowEmployeesPopup] = useState(false);
  const onAddItemClick = () => {
    setShowEmployeesPopup(true);
  };
  return (
    <>
      {showEmployeesPopup && (
        <ModalWrapper
          onClose={() => {
            setShowEmployeesPopup(false);
          }}
          title='Add Employees'
        >
          <AddEmployees />
        </ModalWrapper>
      )}
      <div className='table-wrapper'>
        <Header />
        <section className='pt-[50px]'>
          <AddAndSearchItem
            addButtonText='Add Employees'
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

export default Employees;
