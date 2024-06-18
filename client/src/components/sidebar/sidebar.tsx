import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../button.tsx/button';
import { useCallback } from 'react';
import sidebarData from '../../config/sidebar.data';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = useCallback(
    (url: string): boolean => {
      if (url === '/') {
        return location?.pathname === url;
      } else {
        return location?.pathname?.split('/')?.includes(url.substring(1));
      }
    },
    [location],
  );
  return (
    <nav className='h-screen w-full bg-black-300'>
      <div className='logo text-white-100 grid h-[100px] w-full place-items-center'>
        LOGO
      </div>
      <div className='grid gap-3 p-2'>
        {sidebarData?.map((item) => (
          <Button
            onClick={() => {
              navigate(item?.url);
            }}
            key={item?.id}
            text={item?.name}
            className='hover:bg-primary-400'
            bg={isActive(item?.url) ? 'primary' : 'none'}
            h='50px'
            style={{ whiteSpace: 'nowrap', transition: 'all 550ms ease' }}
            iconStyle={{ width: '20px', height: '20px' }}
            icon={
              <img
                className='h-[20px] w-[20px]'
                alt={item?.name}
                src={item?.icon}
              />
            }
          />
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
