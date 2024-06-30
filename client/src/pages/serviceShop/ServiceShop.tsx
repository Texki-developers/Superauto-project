import { useCallback, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddServiceShop from './AddServiceShop';
import { ColumnData, dummyData } from './serviceShop.data';
import Table from '../../components/table/Table';
import AssignVehicles from '../../components/AssignVehicles/AssignVehicles';
import { useForm } from 'react-hook-form';
import { IServiceShop } from '../../types/serviceShop/serviceShop';

const defaultValues: IServiceShop = {
  name: '', // Default value for name
  phoneNumber: '', // Default value for phoneNumber
};

const ServiceShop = () => {
  const [showServiceShopPopup, setShowServiceShopPopup] = useState(false);
  const [showAssignVehiclePopup, setAssignVehiclePopup] = useState(true);
  const onAddItemClick = () => {
    setShowServiceShopPopup(true);
  };
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  })
  const onCancelClick = useCallback(() => {
    setShowServiceShopPopup(false);
  }, [])
  const onSubmit = (data: IServiceShop) => {
    console.log(data);
    setShowServiceShopPopup(false);
  };
  
  return (
    <>
      {showServiceShopPopup && (
        <ModalWrapper
          onClose={onCancelClick}
          title='Add Service Shop'
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddServiceShop reset={reset} register={register} control={control} errors={errors} onCancelClick={onCancelClick} />
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
      <div className='table-wrapper'>
        <Header />
        <section className='pt-[50px]'>
          <AddAndSearchItem
            addButtonText='Add Service Shop'
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

export default ServiceShop;
