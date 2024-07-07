import React, { useMemo, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import AddVehicle from './AddVehicle';
import Table from '../../components/table/Table';
import { ColumnData } from './vehicle.data';
import addProduct from '../../assets/icons/addCart.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import SellVehicle from './SellVehicle';
import { useQuery } from '@tanstack/react-query';
import { ITableColumn } from '../../types/table/table';
import useGetApis from '../../hooks/useGetApi.hook';
import { useSearchParams } from 'react-router-dom';
import Loading from '../../components/loading/Loading';


const Vehicles = () => {
  const [showAddPage, setShowAddPage] = useState<boolean>(false);
  const [showSellPage, setShowSellPage] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState('')
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
  const onActionClick = (type: 'add' | 'edit' | 'delete', id: string) => {
    if (type === 'add') {
      setSelectedVehicle(id)
      setShowSellPage(true);
    }
  };
  const columnData: ITableColumn[] = useMemo(() => {
    return [
      ...ColumnData,
      {
        name: 'Action',
        key: 'inventory_id',
        columnData: (id: string) => (
          <div className='flex gap-2 *:h-[20px] *:w-[20px]'>
            <img
              onClick={() => onActionClick('add', id)}
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
        isPending && <Loading />
      }
      <main className='table-wrapper'>

        {showAddPage ? (
          <AddVehicle setShowAddPage={setShowAddPage} refetch={refetch} />
        ) :
          showSellPage ? (
            <SellVehicle refetch={refetch} vehicleId={selectedVehicle} setShowSellPage={setShowSellPage} />
          ) :
            (
              <>
                <Header />
                <div className='pt-[50px]'>
                  <AddAndSearchItem
                    onSearch={onSearchData}
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
