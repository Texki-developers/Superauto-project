import { useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddFinance from './AddFinance';
import Table from '../../components/table/Table';
import { ColumnData, dummyData } from './finance.data';

import AssignVehicles from './AssignVehicles';

const Finance = () => {
  const [showAddFinancerPopup, setShowAddFinancerPopup] = useState(false);
  const [showAssignVehiclePopup, setAssignVehiclePopup] = useState(true);

  const onAddItemClick = () => {
    setShowAddFinancerPopup(true);
  };

 

  return (
    <div className='table-wrapper'>
      {/* {showAddFinancerPopup && (
        <ModalWrapper
          onClose={() => {
            setShowAddFinancerPopup(false);
          }}
          title='Add Financer'
        >
          <AddFinance />
        </ModalWrapper>
      )} */}

      {showAssignVehiclePopup && (
        <ModalWrapper
          onClose={() => {
            setAssignVehiclePopup(false);
          }}
          title='Assign Vehicle'
        >
          <AssignVehicles setAssign={setAssignVehiclePopup}/>
        </ModalWrapper>
      )}

      <Header />
      <section className='pt-[50px]'>
        <AddAndSearchItem
          addButtonText='Add Financer'
          onAddButtonClick={onAddItemClick}
        />
      </section>
      <section className='pb-2 pt-5'>
        <Table data={dummyData} columnData={ColumnData} />
      </section>
    </div>
  );
};

export default Finance;
