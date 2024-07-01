import { useCallback, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddCustomers from './AddCustomers';
import { ColumnData, dummyData } from './customers.data';
import { ICustomer } from '../../types/customers/customers';
import { useForm } from 'react-hook-form';
import Table from '../../components/table/Table';
import { IAccountApiBody, ICategory } from '../../types/apimodal/apimodal.d';
import useAccountApi from '../../hooks/useAccountApi.hook';

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
    const body: IAccountApiBody = {
      "name": data?.name,
      "contactInfo": data?.phoneNumber,
      category: data?.isBroker ? ICategory.BROKER : ICategory.CUSTOMER
    }
    setShowCustomersPopup(false);
    accountApi(body, 'Customer creation Failed', 'Customer Successfully Created', () => { reset() })
  };
  return (
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
            addButtonText='Add Customer'
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

export default Customers;
