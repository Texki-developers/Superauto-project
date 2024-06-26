import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../button.tsx/Button';
import React, { useCallback, useState } from 'react';
import sidebarData from '../../config/sidebar.data';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSubmenu, setShowSubmenu] = useState(false);

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

  const onSidebarItemClick = useCallback((url: string, hasSubmenu: boolean, isSidebar?: boolean) => {
    console.log(hasSubmenu, isSidebar)
    if (!hasSubmenu) { navigate(url); return }
    !isSidebar && setShowSubmenu(!showSubmenu)
  }, [navigate, showSubmenu])
  return (
    <nav className='h-screen w-full bg-black-300 overflow-auto'>
      <div className='logo text-white-100 grid h-[100px] w-full place-items-center'>
        LOGO
      </div>
      <div className='grid gap-3 p-2'>
        {sidebarData?.map((item) => (
          <React.Fragment key={item?.id}>
            <Button
              onClick={() => onSidebarItemClick(item?.url, item?.isSubMenu)}
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
            {
              showSubmenu && (
                <div>
                  {
                    item?.children?.map((child) => (
                      <Button
                        onClick={() => onSidebarItemClick(child?.url, child?.isSubMenu, true)}
                        text={child?.name}
                        bg={isActive(child?.url) ? 'primary' : 'none'}
                        h='50px'
                        w="150px"
                        style={{ whiteSpace: 'nowrap', justifyContent: "start", transition: 'all 550ms ease' }}
                      />
                    ))
                  }
                </div>
              )
            }
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
