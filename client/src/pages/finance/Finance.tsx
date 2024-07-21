import { useCallback, useMemo, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import ModalWrapper from '../../components/modalWrapper';
import Table from '../../components/table/Table';
import { ColumnData } from './finance.data';
import addProduct from '../../assets/icons/vehicle.png';
import AssignVehicles from '../../components/AssignVehicles/AssignVehicles';
import { useForm } from 'react-hook-form';
import AddFinance from './AddFinance';
import { IFinance } from '../../types/finance/finance';
import { IAccountApiBody, ICategory } from '../../types/apimodal/apimodal.d';
import useAccountApi from '../../hooks/useAccountApi.hook';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import useGetCategoryApi from '../../hooks/useGetCategoryApi.hook';
import Loading from '../../components/loading/Loading';
import DeleteModal from '../../components/deleteModal/DeleteModal';
import { IListAccountData } from '../../types/common/common';

const defaultValues: IFinance = {
  name: '', // Default value for name
  phoneNumber: '', // Default value for phoneNumber
};

const Finance = () => {
  const [showAddFinancerPopup, setShowAddFinancerPopup] = useState(false);
  const [showAssignVehiclePopup, setAssignVehiclePopup] = useState(false);
  const [showDeletePage, setShowDeletePage] = useState(false)
  const [selectedAccountData, setSelectedAccountData] = useState<IListAccountData | null>(null)

  const [assignId, setAssignId] = useState(0)
  const onAddItemClick = () => {
    setShowAddFinancerPopup(true);
  };
  const { data, isPending, refetch } = useGetCategoryApi(ICategory.FINANCER)
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues
  })

  const onCancelClick = useCallback(() => {
    reset()
    setShowAddFinancerPopup(false);
  }, [])
  const accountApi = useAccountApi()
  const onSubmit = async (data: IFinance) => {
    const body: IAccountApiBody = {
      "name": data?.name,
      "contactInfo": data?.phoneNumber,
      category: ICategory.FINANCER
    }
    setShowAddFinancerPopup(false);
    await accountApi(body, 'Financer creation Failed', 'Financer Successfully Created', () => { reset() })
    refetch()
  };
  const onActionClick = (type: string, id: string, data: IListAccountData) => {
    if (type === 'assign') {
      setAssignId(Number(id))
      setAssignVehiclePopup(true)
    } else if (type === 'delete') {
      setShowDeletePage(true)
      setSelectedAccountData(data)
    }
  }
  const columnData = useMemo(() => {
    return [
      ...ColumnData,
      {
        name: 'Action',
        key: 'account_id',
        returnData: true,
        columnData: (id: string, data: IListAccountData) => (
          <div className='flex gap-2 *:h-[20px] *:w-[20px] cursor-pointer'>
            <img
              onClick={() => onActionClick('assign', id, data)}
              src={addProduct}
              alt=''
            />
            <img
              onClick={() => onActionClick('edit', id, data)}
              src={EditIcon}
              alt=''
            />
            <img
              onClick={() => onActionClick('delete', id, data)}
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


      <div className='table-wrapper'>


        <Header />
        <section className='pt-[50px]'>
          <AddAndSearchItem
            hideSearch
            addButtonText='Add Financer'
            onAddButtonClick={onAddItemClick}
          />
        </section>
        <section className='pb-2 pt-5'>
          <Table meta={data?.meta} data={data?.data} columnData={columnData} />
        </section>
      </div>
      {
        isPending && (
          <Loading />
        )
      }
      {
        selectedAccountData &&
        showDeletePage && (
          <DeleteModal
            refetch={refetch}
            apiUrl={`accounts/delete/account?id=${selectedAccountData?.account_id}&type=vehicle`}
            category='Financer'
            onClose={() => setShowDeletePage(false)}
            verifyText={selectedAccountData?.name}
            label={`Enter the Name ( ${selectedAccountData?.name} )`}
          />
        )
      }
      {showAddFinancerPopup && (
        <ModalWrapper
          onClose={() => {
            setShowAddFinancerPopup(false);
          }}
          title='Add Financer'
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddFinance reset={reset} register={register} control={control} errors={errors} onCancelClick={onCancelClick} />

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
          <AssignVehicles apiUrl='/finance' setAssign={setAssignVehiclePopup} parent='financerId' itemId={assignId} />
        </ModalWrapper>
      )}
    </>
  );
};

export default Finance;
