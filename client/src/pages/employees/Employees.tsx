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
import useGetCategoryApi from '../../hooks/useGetCategoryApi.hook';
import EditIcon from '../../assets/icons/edit.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import DeleteModal from '../../components/deleteModal/DeleteModal';
import { IListAccountData } from '../../types/common/common';

const defaultValues: IEmployee = {
  name: '', // Default value for name
  phoneNumber: '', // Default value for phoneNumber
  salary: undefined, // Default value for salary
};

const Employees = () => {
  const [showEmployeesPopup, setShowEmployeesPopup] = useState(false);
  const [showDeletePage, setShowDeletePage] = useState(false);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState<IListAccountData | null>(null);

  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  });

  const accountApi = useAccountApi();

  const onSubmit = async (data: IEmployee) => {
    const body: IAccountApiBody = {
      name: data?.name,
      contactInfo: data?.phoneNumber,
      salary: data?.salary,
      category: ICategory.EMPLOYEE
    };
    setShowEmployeesPopup(false);
    await accountApi(body, 'Employee creation Failed', 'Employee Successfully Created', () => { reset(); });
    refetch();
  };

  const onCancelClick = useCallback(() => {
    reset();
    setShowEmployeesPopup(false);
  }, [reset]);

  const onAddItemClick = () => {
    setShowEmployeesPopup(true);
  };

  const { data, isPending, refetch } = useGetCategoryApi(ICategory.EMPLOYEE);

  const onActionClick = (type: string, id: string, data: IListAccountData) => {
    if (type === 'edit') {
      console.log('Edit action for id:', id); // Handle edit action
    } else if (type === 'delete') {
      setShowDeletePage(true);
      setSelectedEmployeeData(data);
    }
  };

  const columnData = useMemo(() => {
    return [
      ...ColumnData,
      {
        name: 'Action',
        key: 'id',
        returnData: true,
        columnData: (id: string, data: IListAccountData) => (
          <div className='flex gap-2 *:h-[20px] *:w-[20px] cursor-pointer'>
            <img
              onClick={() => onActionClick('edit', id, data)}
              src={EditIcon}
              alt='Edit'
            />
            <img
              onClick={() => onActionClick('delete', id, data)}
              src={DeleteIcon}
              alt='Delete'
            />
          </div>
        ),
      },
    ];
  }, []);

  return (
    <>
      {isPending ? <p>Loading...</p> : (
        <>
          {showEmployeesPopup && (
            <ModalWrapper
              onClose={onCancelClick}
              title='Add Employee'
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <AddEmployees reset={reset} register={register} control={control} errors={errors} onCancelClick={onCancelClick} />
              </form>
            </ModalWrapper>
          )}

          {showDeletePage && selectedEmployeeData && (
            <DeleteModal
              refetch={refetch}
              apiUrl={`accounts/delete/account?id=${selectedEmployeeData.account_id}`}
              category='Employee'
              onClose={() => setShowDeletePage(false)}
              verifyText={selectedEmployeeData.name}
              label={`Enter the Name ( ${selectedEmployeeData.name} )`}
            />
          )}

          <div className='table-wrapper'>
            <Header />
            <section className='pt-[50px]'>
              <AddAndSearchItem
                hideSearch
                addButtonText='Add Employee'
                onAddButtonClick={onAddItemClick}
              />
            </section>
            <section className='pt-5 pb-2'>
              <Table meta={data?.meta} data={data?.data} columnData={columnData} />
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Employees;
