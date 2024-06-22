import Sidebar from '../../components/sidebar/sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <main className='grid max-h-screen grid-cols-[230px_1fr] overflow-hidden bg-gray-100'>
      <Sidebar />
      <div className='p-4 h-screen overflow-auto'>
        <Outlet />
      </div>
    </main>
  );
};

export default DashboardLayout;
