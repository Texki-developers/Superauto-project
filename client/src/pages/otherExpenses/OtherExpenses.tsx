import { useCallback, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddOtherExpenses from './AddOtherExpenses';
import { ColumnData, dummyData } from './otherExpenses.data';
import Table from '../../components/table/Table';
import { IOtherExpense } from '../../types/otherExpenses/otherExpenses';
import { useForm } from 'react-hook-form';
import useGetDropdownData from '../../hooks/useGetDropdownData.hook';


const defaultValues: IOtherExpense = {
  name: '', // Default value for name
  phoneNumber: '', // Default value for phoneNumber
  salary: 0, // Default value for salary
};
const OtherExpenses = () => {
  const [showOtherExpensesPopup, setShowOtherExpensesPopup] = useState(false);
  const onAddItemClick = () => {
    setShowOtherExpensesPopup(true);
  };
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  })

  const onCancelClick = useCallback(() => {
    setShowOtherExpensesPopup(false);
  }, [])
  const onSubmit = (data: IOtherExpense) => {
    console.log(data);
    setShowOtherExpensesPopup(false);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddOtherExpenses reset={reset} register={register} control={control} errors={errors} onCancelClick={onCancelClick} />
          </form>
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
