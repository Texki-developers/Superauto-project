import { useCallback, useMemo, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddCustomers from './AddCustomers';
import { ColumnData } from './customers.data';
import { ICustomer } from '../../types/customers/customers';
import { useForm } from 'react-hook-form';
import Table from '../../components/table/Table';
import { IAccountApiBody, ICategory } from '../../types/apimodal/apimodal.d';
import useAccountApi from '../../hooks/useAccountApi.hook';
import { ITableColumn } from '../../types/table/table';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import useGetCategoryApi from '../../hooks/useGetCategoryApi.hook';

const defaultValues: ICustomer = {
  name: '', // Default value for name
  phoneNumber: '', // Default value for phoneNumber
  isBroker: false, // Default value for isBroker
};

const Customers = () => {
  const [showCustomersPopup, setShowCustomersPopup] = useState(false);
  const onAddItemClick = () => {
    setShowCustomersPopup(true);
  };
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  })
  const onCancelClick = useCallback(() => {
    setShowCustomersPopup(false);
  }, [])
  const accountApi = useAccountApi()
  const onSubmit = async (data: ICustomer) => {
    console.log(data)
    const body: IAccountApiBody = {
      "name": data?.name,
      "contactInfo": data?.phoneNumber,
      category: data?.isBroker ? ICategory.BROKER : ICategory.CUSTOMER
    }
    setShowCustomersPopup(false);
    await accountApi(body, 'Customer creation Failed', 'Customer Successfully Created', () => { reset() })
    refetch()
  };
  const { data, isPending, refetch } = useGetCategoryApi(ICategory.CUSTOMER)
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
        isPending ? <p>Loading</p> :
          <>
            {showCustomersPopup && (
              <ModalWrapper
                onClose={onCancelClick}
                title='Add Customer'
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <AddCustomers reset={reset} register={register} control={control} errors={errors} onCancelClick={onCancelClick} />
                </form>
              </ModalWrapper>
            )}
            <div className='table-wrapper'>
              <Header />
              <section className='pt-[50px]'>
                <AddAndSearchItem
                  onSearch={() => { }}
                  addButtonText='Add Customer'
                  onAddButtonClick={onAddItemClick}
                />
              </section>
              <section className='pt-5 pb-2'>
                <Table meta={data?.meta} data={data.data} columnData={columnData} />
              </section>
            </div>
          </>
      }</>
  );
};

export default Customers;
