import { useCallback, useMemo, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddDeliveryServices from './AddDeliveryServices';
import { ColumnData } from './deliveryServices.data';
import Table from '../../components/table/Table';
import { IDeliveryService } from '../../types/deliveryServices/deliveryServices';
import { useForm } from 'react-hook-form';
import useAccountApi from '../../hooks/useAccountApi.hook';
import { IAccountApiBody, ICategory } from '../../types/apimodal/apimodal.d';
import AssignVehicles from '../../components/AssignVehicles/AssignVehicles';
import addProduct from '../../assets/icons/vehicle.png';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import useGetCategoryApi from '../../hooks/useGetCategoryApi.hook';
import DeleteModal from '../../components/deleteModal/DeleteModal';
import { IListAccountData } from '../../types/common/common';

const defaultValues: IDeliveryService = {
  name: '', // Default value for name
  phoneNumber: '', // Default value for phoneNumber
};

const DeliveryServices = () => {
  const [showDeliveryServicesPopup, setShowDeliveryServicesPopup] = useState(false);
  const [showAssignVehiclePopup, setAssignVehiclePopup] = useState(false);
  const [showDeletePage, setShowDeletePage] = useState(false);
  const [selectedServiceData, setSelectedServiceData] = useState<IListAccountData | null>(null);
  const [assignId, setAssignId] = useState(0);

  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  });

  const accountApi = useAccountApi();
  const { data, isPending, refetch } = useGetCategoryApi(ICategory.DELIVERY_SERVICE);

  const onSubmit = async (data: IDeliveryService) => {
    const body: IAccountApiBody = {
      name: data?.name,
      contactInfo: data?.phoneNumber,
      category: ICategory.DELIVERY_SERVICE
    };
    setShowDeliveryServicesPopup(false);
    await accountApi(body, 'Delivery Service creation Failed', 'Delivery Service Successfully Created', () => { reset() });
    refetch();
  };

  const onCancelClick = useCallback(() => {
    reset();
    setShowDeliveryServicesPopup(false);
  }, [reset]);

  const onAddItemClick = () => {
    setShowDeliveryServicesPopup(true);
  };

  const onActionClick = (type: string, id: string, data: IListAccountData) => {
    if (type === 'assign') {
      setAssignId(Number(data?.account_id));
      setAssignVehiclePopup(true);
    } else if (type === 'edit') {
      // Implement edit functionality here
      console.log('Edit action for id:', id);
    } else if (type === 'delete') {
      setShowDeletePage(true);
      setSelectedServiceData(data);
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
          <div className='flex gap-2 *:h-[20px] *:w-[20px]'>
            <img
              onClick={() => onActionClick('assign', id, data)}
              src={addProduct}
              alt='Assign'
            />
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
  console.log(assignId)
  return (
    <>
      {isPending ? <p>Loading...</p> : (
        <>
          {showDeliveryServicesPopup && (
            <ModalWrapper
              onClose={onCancelClick}
              title='Add Delivery Service'
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <AddDeliveryServices reset={reset} register={register} control={control} errors={errors} onCancelClick={onCancelClick} />
              </form>
            </ModalWrapper>
          )}
          {showAssignVehiclePopup && (
            <ModalWrapper
              onClose={() => setAssignVehiclePopup(false)}
              title='Assign Vehicle'
            >
              <AssignVehicles apiUrl='/delivery-service' setAssign={setAssignVehiclePopup} parent='serviceId' itemId={assignId} />
            </ModalWrapper>
          )}
          {selectedServiceData && showDeletePage && (
            <DeleteModal
              refetch={refetch}
              apiUrl={`accounts/delete/account?id=${selectedServiceData.account_id}`}
              category='Delivery Service'
              onClose={() => setShowDeletePage(false)}
              verifyText={selectedServiceData.name}
              label={`Enter the Name (${selectedServiceData.name})`}
            />
          )}
          <div className='table-wrapper'>
            <Header />
            <section className='pt-[50px]'>
              <AddAndSearchItem
                hideSearch
                addButtonText='Add Delivery Service'
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

export default DeliveryServices;
