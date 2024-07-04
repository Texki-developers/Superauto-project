import { useCallback, useMemo, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddDeliveryServices from './AddDeliveryServices';
import { ColumnData, dummyData } from './deliveryServices.data';
import Table from '../../components/table/Table';
import { IDeliveryService } from '../../types/deliveryServices/deliveryServices';
import { useForm } from 'react-hook-form';
import useAccountApi from '../../hooks/useAccountApi.hook';
import { IAccountApiBody, ICategory } from '../../types/apimodal/apimodal.d';
import AssignVehicles from '../../components/AssignVehicles/AssignVehicles';
import addProduct from '../../assets/icons/addCart.svg';

const defaultValues: IDeliveryService = {
  name: '', // Default value for name
  phoneNumber: '', // Default value for phoneNumber
};

const DeliveryServices = () => {
  const [showDeliveryServicesPopup, setShowDeliveryServicesPopup] = useState(false);

  const [assignId, setAssignId] = useState(0)
  const [showAssignVehiclePopup, setAssignVehiclePopup] = useState(false);
  const onAddItemClick = () => {
    setShowDeliveryServicesPopup(true);
  };
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  })
  const onCancelClick = useCallback(() => {
    setShowDeliveryServicesPopup(false);
  }, [])
  const accountApi = useAccountApi()
  const onSubmit = (data: IDeliveryService) => {
    const body: IAccountApiBody = {
      "name": data?.name,
      "contactInfo": data?.phoneNumber,
      category: ICategory.DELIVERY_SERVICE
    }
    console.log(data);
    setShowDeliveryServicesPopup(false);
    accountApi(body, 'Customer creation Failed', 'Customer Successfully Created')
  };
  const onActionClick = (id: number) => {
    setAssignId(id)
    setAssignVehiclePopup(true)
  }
  const columnData = useMemo(() => {
    return [
      ...ColumnData,
      {
        name: 'Action',
        key: 'id',
        columnData: (id: string) => (
          <div className='flex gap-2 *:h-[20px] *:w-[20px]'>
            <img
              onClick={() => onActionClick(parseInt(id))}
              src={addProduct}
              alt=''
            />
          </div>
        ),
      },
    ];
  }, []);
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
      {showAssignVehiclePopup && (
        <ModalWrapper
          onClose={() => {
            setAssignVehiclePopup(false);
          }}
          title='Assign Vehicle'
        >
          <AssignVehicles apiUrl='/delivery-service' setAssign={setAssignVehiclePopup} parent='serviceId' itemId={4} />
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
          <Table data={dummyData} columnData={columnData} />
        </section>
      </div>
    </>
  );
};

export default DeliveryServices;
