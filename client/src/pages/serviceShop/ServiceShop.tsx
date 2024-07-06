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
import EditIcon from '../../assets/icons/edit.svg';
import useGetCategoryApi from '../../hooks/useGetCategoryApi.hook';

const defaultValues: IServiceShop = {
  name: '', // Default value for name
  phoneNumber: '', // Default value for phoneNumber
};

const ServiceShop = () => {
  const [showServiceShopPopup, setShowServiceShopPopup] = useState(false);
  const [showAssignVehiclePopup, setAssignVehiclePopup] = useState(false);
  const [assignId, setAssignId] = useState(0)

  const onAddItemClick = () => {
    setShowServiceShopPopup(true);
  };
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  })
  const onCancelClick = useCallback(() => {
    setShowServiceShopPopup(false);
  }, [])
  const accountApi = useAccountApi()
  const onSubmit = async (data: IServiceShop) => {
    const body: IAccountApiBody = {
      "name": data?.name,
      "contactInfo": data?.phoneNumber,
      category: ICategory.SERVICE_SHOP
    }
    setShowServiceShopPopup(false);
    await accountApi(body, 'Service Shop creation Failed', 'Service Shop Successfully Created', () => { reset() })
    refetch()
  };
  const { data, isPending, refetch } = useGetCategoryApi(ICategory.SERVICE_SHOP)
  const onActionClick = (type: string, id: string) => {
    if (type === 'assign') {
      setAssignId(Number(id))
      setAssignVehiclePopup(true)
    }
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
              onClick={() => onActionClick('assign', id)}
              src={addProduct}
              alt=''
            />
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
            <div className='table-wrapper'>
              <Header />
              <section className='pt-[50px]'>
                <AddAndSearchItem
                  addButtonText='Add Service Shop'
                  onAddButtonClick={onAddItemClick}
                />
              </section>
              <section className='pt-5 pb-2'>
                <Table data={data?.data} columnData={columnData} />
              </section>
            </div>
          </>
      }
    </>
  );
};

export default ServiceShop;
