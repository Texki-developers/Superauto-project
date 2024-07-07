import Addbutton from '../../components/addButton/Addbutton';
import Sidebar from '../../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './style.scss'

const DashboardLayout = () => {
  return (
    <main className='grid max-h-screen grid-cols-[250px_1fr] overflow-hidden bg-gray-100'>
      <Sidebar />
      <div className=' body-container p-4 h-screen relative'>
        <Outlet />
        <Addbutton />
      </div>
    </main>
  );
};

export default DashboardLayout;
