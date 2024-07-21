import { useCallback, useMemo, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import AddServiceShop from './AddServiceShop';
import { ColumnData } from './serviceShop.data';
import Table from '../../components/table/Table';
import AssignVehicles from '../../components/AssignVehicles/AssignVehicles';
import { useForm } from 'react-hook-form';
import { IServiceShop } from '../../types/serviceShop/serviceShop';
import { IAccountApiBody, ICategory } from '../../types/apimodal/apimodal.d';
import useAccountApi from '../../hooks/useAccountApi.hook';
import { ITableColumn } from '../../types/table/table';
import addProduct from '../../assets/icons/vehicle.png';
import DeleteIcon from '../../assets/icons/delete.svg';
import useGetCategoryApi from '../../hooks/useGetCategoryApi.hook';
import { IListAccountData } from '../../types/common/common';
import DeleteModal from '../../components/deleteModal/DeleteModal';

const defaultValues: IServiceShop = {
  name: '', // Default value for name
  phoneNumber: '', // Default value for phoneNumber
};

const ServiceShop = () => {
  const [showServiceShopPopup, setShowServiceShopPopup] = useState(false);
  const [showAssignVehiclePopup, setAssignVehiclePopup] = useState(false);
  const [assignId, setAssignId] = useState(0);
  const [showDeletePage, setShowDeletePage] = useState(false);
  const [selectedAccountData, setSelectedAccountData] = useState<IListAccountData | null>(null);

  const onAddItemClick = () => {
    setShowServiceShopPopup(true);
  };

  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  });

  const onCancelClick = useCallback(() => {
    reset();
    setShowServiceShopPopup(false);
  }, [reset]);

  const accountApi = useAccountApi();
  
  const onSubmit = async (data: IServiceShop) => {
    const body: IAccountApiBody = {
      "name": data?.name,
      "contactInfo": data?.phoneNumber,
      category: ICategory.SERVICE_SHOP
    };
    setShowServiceShopPopup(false);
    await accountApi(body, 'Service Shop creation Failed', 'Service Shop Successfully Created', () => { reset(); });
    refetch();
  };

  const { data, isPending, refetch } = useGetCategoryApi(ICategory.SERVICE_SHOP);

  const onActionClick = (type: string, id: string, data: IListAccountData) => {
    if (type === 'assign') {
      setAssignId(Number(id));
      setAssignVehiclePopup(true);
    } else if (type === 'delete') {
      setShowDeletePage(true);
      setSelectedAccountData(data);
    }
  };

  const columnData: ITableColumn[] = useMemo(() => {
    return [
      ...ColumnData,
      {
        name: 'Action',
        key: 'account_id',
        returnData: true,  // Added returnData
        columnData: (id: string, data: IListAccountData) => (
          <div className='flex gap-2 *:h-[20px] *:w-[20px] cursor-pointer'>
            <img
              onClick={() => onActionClick('assign', id, data)}
              src={addProduct}
              alt='Assign'
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
              <AssignVehicles apiUrl='/service' setAssign={setAssignVehiclePopup} parent='serviceId' itemId={assignId} />
            </ModalWrapper>
          )}

          {selectedAccountData && showDeletePage && (
            <DeleteModal
              refetch={refetch}
              apiUrl={`accounts/delete/account?id=${selectedAccountData?.account_id}&type=vehicle`}
              category='Service Shop'
              onClose={() => setShowDeletePage(false)}
              verifyText={selectedAccountData?.name}
              label={`Enter the Name ( ${selectedAccountData?.name} )`}
            />
          )}

          <div className='table-wrapper'>
            <Header />
            <section className='pt-[50px]'>
              <AddAndSearchItem
                hideSearch
                addButtonText='Add Service Shop'
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

export default ServiceShop;
