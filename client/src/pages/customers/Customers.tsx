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
import useGetCategoryApi from '../../hooks/useGetCategoryApi.hook';
import EditIcon from '../../assets/icons/edit.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import { IListAccountData } from '../../types/common/common';
import DeleteModal from '../../components/deleteModal/DeleteModal';

const defaultValues: ICustomer = {
  name: '', // Default value for name
  phoneNumber: '', // Default value for phoneNumber
  isBroker: false, // Default value for isBroker
};

const Customers = () => {
  const [showCustomersPopup, setShowCustomersPopup] = useState(false);
  const [showDeletePage, setShowDeletePage] = useState(false);
  const [selectedAccountData, setSelectedAccountData] = useState<IListAccountData | null>(null);

  const onAddItemClick = () => {
    setShowCustomersPopup(true);
  };

  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  });

  const onCancelClick = useCallback(() => {
    reset();
    setShowCustomersPopup(false);
  }, [reset]);

  const accountApi = useAccountApi();

  const onSubmit = async (data: ICustomer) => {
    const body: IAccountApiBody = {
      "name": data?.name,
      "contactInfo": data?.phoneNumber,
      category: data?.isBroker ? ICategory.BROKER : ICategory.CUSTOMER
    };
    setShowCustomersPopup(false);
    await accountApi(body, 'Customer creation Failed', 'Customer Successfully Created', () => { reset(); });
    refetch();
  };

  const { data, isPending, refetch } = useGetCategoryApi(ICategory.CUSTOMER);

  const onActionClick = (type: string, id: string, data: IListAccountData) => {
    if (type === 'edit') {
      console.log('Edit action for id:', id);  // Handle edit action
    } else if (type === 'delete') {
      setShowDeletePage(true);
      setSelectedAccountData(data);
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

          {showDeletePage && selectedAccountData && (
            <DeleteModal
              refetch={refetch}
              apiUrl={`accounts/delete/account?id=${selectedAccountData.account_id}`}
              category='Customer'
              onClose={() => setShowDeletePage(false)}
              verifyText={selectedAccountData.name}
              label={`Enter the Name ( ${selectedAccountData.name} )`}
            />
          )}

          <div className='table-wrapper'>
            <Header />
            <section className='pt-[50px]'>
              <AddAndSearchItem
                hideSearch
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
      )}
    </>
  );
};

export default Customers;
