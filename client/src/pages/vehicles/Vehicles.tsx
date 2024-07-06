import { useMemo, useState } from 'react';
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


const Vehicles = () => {
  const [showAddPage, setShowAddPage] = useState<boolean>(false);
  const [showSellPage, setShowSellPage] = useState<boolean>(false);
  const onAddButtonClick = () => {
    setShowAddPage(true);
  };
  const { callApi } = useGetApis()
  const fetchVehicles = () => callApi('inventory/list/vehicle');
  const { data, isPending, refetch } = useQuery({ queryKey: ['getVehicles'], queryFn: fetchVehicles })
  console.log(data)

  const onActionClick = (type: 'add' | 'edit' | 'delete', id: string) => {
    type === 'add' && setShowSellPage(true);
    console.log(id)
  };
  const columnData: ITableColumn[] = useMemo(() => {
    return [
      ...ColumnData,
      {
        name: 'Action',
        key: 'id',
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
        isPending ? <h2>Loading...</h2> : <main className='table-wrapper'>

          {showAddPage ? (
            <AddVehicle setShowAddPage={setShowAddPage} refetch={refetch} />
          ) :
            showSellPage ? (
              <SellVehicle setShowSellPage={setShowSellPage} />
            ) :
              (
                <>
                  <Header />
                  <div className='pt-[50px]'>
                    <AddAndSearchItem
                      addButtonText='Add Vehicle'
                      onAddButtonClick={onAddButtonClick}
                    />
                  </div>
                  <section className='pt-5 pb-2'>
                    <Table data={data} columnData={columnData} />
                  </section>
                </>
              )
          }
        </main >
      }
    </>
  );
};

export default Vehicles;
