import Addbutton from '../../components/addButton/Addbutton';
import Sidebar from '../../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <main className='grid max-h-screen grid-cols-[230px_1fr] overflow-hidden bg-gray-100'>
      <Sidebar />
      <div className='p-4 h-screen overflow-auto'>
        <Outlet />
        <Addbutton />
      </div>
    </main>
  );
};

export default DashboardLayout;
