import { useCallback, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddEmployees from './AddEmployees';
import { ColumnData, dummyData } from './employees.data';
import Table from '../../components/table/Table';
import { IEmployee } from '../../types/employees/employees';
import { useForm } from 'react-hook-form';
import useAccountApi from '../../hooks/useAccountApi.hook';
import { IAccountApiBody, ICategory } from '../../types/apimodal/apimodal.d';

const defaultValues: IEmployee = {
  name: '', // Default value for name
  phoneNumber: '', // Default value for phoneNumber
  salary: 0, // Default value for salary
};

const Employees = () => {
  const [showEmployeesPopup, setShowEmployeesPopup] = useState(false);
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  })
  const accountApi = useAccountApi()
  const onSubmit = (data: IEmployee) => {
    const body: IAccountApiBody = {
      name: data?.name,
      contactInfo: data?.phoneNumber,
      salary: data?.salary,
      category: ICategory.EMPLOYEE
    }
    setShowEmployeesPopup(false);
    accountApi(body, 'Employees creation Failed', 'Employees Successfully Created', () => { reset() })
  };
  const onCancelClick = useCallback(() => {
    setShowEmployeesPopup(false);
  }, [])
  const onAddItemClick = () => {
    setShowEmployeesPopup(true);
  };
  return (
    <>
      {showEmployeesPopup && (
        <ModalWrapper
          onClose={onCancelClick}
          title='Add Employees'
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddEmployees reset={reset} register={register} control={control} errors={errors} onCancelClick={onCancelClick} />

          </form>
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
