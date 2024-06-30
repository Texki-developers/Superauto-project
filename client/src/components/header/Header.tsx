import { useLocation } from 'react-router-dom';
import LogoutImg from '../../assets/header-icons/logout.svg';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import { headersData } from '../../config/pageHeader.data';
import { useMemo } from 'react';
import { IBreadCrumb } from '../../types/breadCrumb/breadCrumb';

interface IBreadCrumbData {
  breadCrumbData?: IBreadCrumb[];
  title?: string;
}
const Header = ({ breadCrumbData, title }: IBreadCrumbData) => {
  const location = useLocation();
  const key = useMemo(
    () =>
      location.pathname === '/'
        ? location.pathname
        : location?.pathname.split('/')[1],
    [location],
  );
  const headerData = useMemo(() => headersData[key ?? '/'], [key]);

  return (
    <header>
      <div className='flex justify-between'>
        <div className='grid gap-1'>
          <h1 className='main-heading text-md'>{title ?? headerData?.title}</h1>
          {(breadCrumbData ?? headerData?.breadCrumb?.length > 1) && (
            <Breadcrumb data={breadCrumbData || headerData?.breadCrumb} />
          )}
        </div>
        <img
          className='h-[25px] w-[25px]'
          src={LogoutImg}
          alt='Logout'
          title='logout'
        />
      </div>
    </header>
  );
};

export default Header;
