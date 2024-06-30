import { useCallback, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddDeliveryServices from './AddDeliveryServices';
import { ColumnData, dummyData } from './deliveryServices.data';
import Table from '../../components/table/Table';
import { IDeliveryService } from '../../types/deliveryServices/deliveryServices';
import { useForm } from 'react-hook-form';

const defaultValues: IDeliveryService = {
  name: '', // Default value for name
  phoneNumber: '', // Default value for phoneNumber
};

const DeliveryServices = () => {
  const [showDeliveryServicesPopup, setShowDeliveryServicesPopup] = useState(false);
  const onAddItemClick = () => {
    setShowDeliveryServicesPopup(true);
  };
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  })
  const onCancelClick = useCallback(() => {
    setShowDeliveryServicesPopup(false);
  }, [])
  const onSubmit = (data: IDeliveryService) => {
    console.log(data);
    setShowDeliveryServicesPopup(false);
  };
  return (
    <>
      {showDeliveryServicesPopup && (
        <ModalWrapper
          onClose={onCancelClick}
          title='Add Delivery Services'
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddDeliveryServices reset={reset} register={register} control={control} errors={errors} onCancelClick={onCancelClick} />
          </form>
        </ModalWrapper>
      )}
      <div className='table-wrapper'>
        <Header />
        <section className='pt-[50px]'>
          <AddAndSearchItem
            addButtonText='Add Delivery Services'
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

export default DeliveryServices;
