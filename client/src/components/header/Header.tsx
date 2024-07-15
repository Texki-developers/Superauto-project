import { useLocation, useNavigate } from 'react-router-dom';
import LogoutImg from '../../assets/header-icons/logout.svg';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import { headersData } from '../../config/pageHeader.data';
import { useMemo } from 'react';
import { IBreadCrumb } from '../../types/breadCrumb/breadCrumb';
import AuthApiService from '../../services/api-services';
import useToast from '../../hooks/useToast.hook';

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
  const navigate = useNavigate()
  const headerData = useMemo(() => headersData[key ?? '/'], [key]);
  const { toastError, toastLoading, toastSuccess } = useToast()
  const logut = async () => {
    const id = toastLoading('Loading...')
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await AuthApiService.getApi('/auth/logout')
      if (res.statusCode === 200) {
        toastSuccess(id, 'Logged Out Successfully')
        navigate('/login')
      }
    } catch (error) {
      toastError(id, 'Failed to Logout')
      console.log(error)
    }
  }

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
          className='h-[25px] w-[25px] cursor-pointer'
          src={LogoutImg}
          onClick={logut}
          alt='Logout'
          title='logout'
        />
      </div>
    </header>
  );
};

export default Header;
