import { useCallback, useMemo, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddEmployees from './AddEmployees';
import { ColumnData } from './employees.data';
import Table from '../../components/table/Table';
import { IEmployee } from '../../types/employees/employees';
import { useForm } from 'react-hook-form';
import useAccountApi from '../../hooks/useAccountApi.hook';
import { IAccountApiBody, ICategory } from '../../types/apimodal/apimodal.d';
import { ITableColumn } from '../../types/table/table';
import useGetApis from '../../hooks/useGetApi.hook';
// @ts-ignore
import { useQuery } from '@tanstack/react-query';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';

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
  const onSubmit = async (data: IEmployee) => {
    const body: IAccountApiBody = {
      name: data?.name,
      contactInfo: data?.phoneNumber,
      salary: data?.salary,
      category: ICategory.EMPLOYEE
    }
    setShowEmployeesPopup(false);
    await accountApi(body, 'Employees creation Failed', 'Employees Successfully Created', () => { reset() })
    refetch()
  };
  const onCancelClick = useCallback(() => {
    setShowEmployeesPopup(false);
  }, [])
  const onAddItemClick = () => {
    setShowEmployeesPopup(true);
  };
  const { callApi } = useGetApis()
  const fetchEmployees = () => callApi(`accounts/list/category/${ICategory.EMPLOYEE}`);
  const { data, isPending, refetch } = useQuery({ queryKey: ['employees'], queryFn: fetchEmployees })
  const onActionClick = (type: string, id: string) => {
    console.log(type, id)
  }
  const columnData: ITableColumn[] = useMemo(() => {
    return [
      ...ColumnData,
      {
        name: 'Action',
        key: 'id',
        columnData: (id: string) => (
          <div className='flex gap-2 *:h-[20px] *:w-[20px]'>
            <img
              onClick={() => onActionClick('edit', id)}
              src={EditIcon}
              alt=''
            />
            <img
              onClick={() => onActionClick('delete', id)}
              src={DeleteIcon}
              alt=''
            />
          </div>
        ),
      },
    ];
  }, []);
  return (
    <>
      {
        isPending ? <p>Loading...</p> :
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
                <Table data={data} columnData={columnData} />
              </section>
            </div>
          </>
      }
    </>
  );
};

export default Employees;
