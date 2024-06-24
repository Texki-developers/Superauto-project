import { useMemo, useState } from 'react';
import AddAndSearchItem from '../../components/addAndSearchItem/AddAndSearchItem';
import Header from '../../components/header/Header';
import AddVehicle from './AddVehicle';
import Table from '../../components/table/Table';
import { ColumnData, dummyData } from './vehicle.data';
import addProduct from '../../assets/icons/addCart.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
const Vehicles = () => {
  const [showAddPage, setShowAddPage] = useState<boolean>(false);
  const onAddButtonClick = () => {
    setShowAddPage(true);
  };

  const onActionClick = (type: 'add' | 'edit' | 'delete', id: string) => {
    console.log(type, id);
  };
  const columnData = useMemo(() => {
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
    <main className='table-wrapper'>
      {!showAddPage ? (
        <>
          <Header />
          <div className='pt-[50px]'>
            <AddAndSearchItem
              addButtonText='Add Vehicle'
              onAddButtonClick={onAddButtonClick}
            />
          </div>
          <section className='pt-5 pb-2'>
            <Table data={dummyData} columnData={columnData} />
          </section>
        </>
      ) : (
        <AddVehicle setShowAddPage={setShowAddPage} />
      )}
    </main>
  );
};

export default Vehicles;
