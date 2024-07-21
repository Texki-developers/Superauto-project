import React, { useMemo, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import AddVehicle from './AddVehicle';
import Table from '../../components/table/Table';
import { ColumnData } from './vehicle.data';
import addProduct from '../../assets/icons/addCart.svg';
import EditIcon from '../../assets/icons/edit.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import SellVehicle from './SellVehicle';
import { useQuery } from '@tanstack/react-query';
import { ITableColumn } from '../../types/table/table';
import useGetApis from '../../hooks/useGetApi.hook';
import { useSearchParams } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import DeleteModal from '../../components/deleteModal/DeleteModal';
import { IListVehicle } from '../../types/vehicle/vehicle';


const Vehicles = () => {
  const [showAddPage, setShowAddPage] = useState<boolean>(false);
  const [showSellPage, setShowSellPage] = useState<boolean>(false);
  const [showDeletePage, setShowDeletePage] = useState(false)
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedVehicleData, setSelectedVehicleData] = useState<IListVehicle | null>(null)
  const onAddButtonClick = () => {
    setShowAddPage(true);
  };
  const [searchParams] = useSearchParams()
  const { callApi } = useGetApis()
  const url = `inventory/list/vehicle?page=${searchParams.get('page') ?? 1}&perPage=${searchParams.get('perPage') ?? 10}`
  const fetchVehicles = () => callApi(url);
  const { data, isPending, refetch } = useQuery({ queryKey: [url], queryFn: fetchVehicles })
  const onSearchData = (query: string) => {
    console.log(query)
  }
  const onActionClick = (type: 'add' | 'edit' | 'delete', id: string, data: IListVehicle) => {
    if (type === 'add') {
      setShowSellPage(true);
    } else if (type === 'edit') {
      setShowAddPage(true)
      setIsEdit(true)
    } else {
      setShowDeletePage(true)
    }
    setSelectedVehicleData(data)
  };
  const columnData: ITableColumn[] = useMemo(() => {
    return [
      ...ColumnData,
      {
        name: 'Action',
        key: 'inventory_id',
        returnData: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        columnData: (id: string, data: any) => (
          <div className='flex gap-2 *:h-[20px] *:w-[20px] cursor-pointer'>
            <img
              onClick={() => onActionClick('add', id, data)}
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
      {
        isPending && <Loading />
      }
      {showDeletePage &&
        selectedVehicleData &&
        <DeleteModal
          refetch={refetch}
          apiUrl={`inventory/delete/vehicle?id=${selectedVehicleData?.inventory_id}&type=vehicle`}
          category='Vehicle'
          onClose={() => setShowDeletePage(false)}
          verifyText={selectedVehicleData?.registration_number}
          label={`Enter the Vehicle Registration Number ( ${selectedVehicleData?.registration_number} )`}
        />
      }
      <main className='table-wrapper'>
        {showAddPage && selectedVehicleData ? (
          <AddVehicle setIsEdit={setIsEdit} isEdit={isEdit} selectedItem={selectedVehicleData?.inventory_id} setShowAddPage={setShowAddPage} refetch={refetch} />
        ) :
          showSellPage && selectedVehicleData ? (
            <SellVehicle refetch={refetch} vehicleId={selectedVehicleData?.inventory_id} setShowSellPage={setShowSellPage} />
          ) :
            (
              <>
                <Header />
                <div className='pt-[50px]'>
                  <AddAndSearchItem
                    onSearch={onSearchData}
                    hideSearch
                    addButtonText='Add Vehicle'
                    onAddButtonClick={onAddButtonClick}
                  />
                </div>
                <section className='pt-5 pb-2'>
                  <Table meta={data?.meta} data={data?.data} columnData={columnData} />
                </section>
              </>
            )
        }
      </main >
    </>
  );
};

export default React.memo(Vehicles);
