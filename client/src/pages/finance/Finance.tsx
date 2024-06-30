import { useCallback, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import Table from '../../components/table/Table';
import { ColumnData, dummyData } from './finance.data';
import AssignVehicles from '../../components/AssignVehicles/AssignVehicles';
import { useForm } from 'react-hook-form';
import AddFinance from './AddFinance';
import { IFinance } from '../../types/finance/finance';


const defaultValues: IFinance = {
  name: '', // Default value for name
  phoneNumber: '', // Default value for phoneNumber
};

const Finance = () => {
  const [showAddFinancerPopup, setShowAddFinancerPopup] = useState(false);
  const [showAssignVehiclePopup, setAssignVehiclePopup] = useState(true);

  const onAddItemClick = () => {
    setShowAddFinancerPopup(true);
  };

  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  })
  const onCancelClick = useCallback(() => {
    setShowAddFinancerPopup(false);
  }, [])
  const onSubmit = (data: IFinance) => {
    console.log(data);
    setShowAddFinancerPopup(false);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddFinance reset={reset} register={register} control={control} errors={errors} onCancelClick={onCancelClick} />

          </form>
        </ModalWrapper>
      )}

      {showAssignVehiclePopup && (
        <ModalWrapper
          onClose={() => {
            setAssignVehiclePopup(false);
          }}
          title='Assign Vehicle'
        >
          <AssignVehicles setAssign={setAssignVehiclePopup} />
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
