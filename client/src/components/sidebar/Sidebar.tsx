import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../button.tsx/Button';
import React, { useCallback, useEffect, useState } from 'react';
import sidebarData from '../../config/sidebar.data';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [clickedItem, setClickedItem] = useState('');

  const isActive = useCallback(
    (url: string): boolean => {
      if (url === '/') {
        return location?.pathname === url;
      } else if (location.pathname === url) {
        return true
      } else {
        return location?.pathname?.split('/')?.includes(url.substring(1));
      }
    },
    [location],
  );
  useEffect(() => {
    for (const item of sidebarData) {
      if (item.children) {
        for (const child of item.children) {
          if (child.url === location.pathname) {
            setShowSubmenu(true)
            setClickedItem(item.id)
          }
        }
      }
    }
  }, [])

  const onSidebarItemClick = useCallback((url: string, hasSubmenu: boolean, id: string, isSidebar?: boolean) => {
    if (!hasSubmenu) {
      navigate(url);
      return
    }
    if (!isSidebar) {
      setClickedItem(showSubmenu ? '' : id)
      setShowSubmenu(!showSubmenu)
    }
  }, [navigate, showSubmenu])
  return (
    <nav className='h-screen w-full bg-black-300 overflow-auto'>
      <div className='logo text-white-100 grid h-[100px] w-full place-items-center'>
        LOGO
      </div>
      <div className='grid gap-2 p-2'>
        {sidebarData?.map((item) => (
          <React.Fragment key={item?.id}>
            <Button
              onClick={() => onSidebarItemClick(item?.url, item?.isSubMenu, item.id)}
              text={item?.name}
              className='hover:bg-primary-400'
              bg={isActive(item?.url) && !item?.isSubMenu ? 'primary' : 'none'}
              h='50px'
              style={{ whiteSpace: 'nowrap', transition: 'all 550ms ease' }}
              iconStyle={{ width: '20px', height: '20px' }}
              icon={
                <img
                  className={`h-[20px] w-[20px] ${item?.isSubMenu && (clickedItem === item?.id) ? 'rotate-90' : 'rotate-0'}`}
                  alt={item?.name}
                  src={item?.icon}
                />
              }
            />
            {
              showSubmenu && (item?.id === clickedItem) && (
                <div className='grid justify-end gap-1'>
                  {
                    item?.children?.map((child) => (
                      <Button
                        onClick={() => onSidebarItemClick(child?.url, child?.isSubMenu, child.id, true)}
                        text={child?.name}
                        bg={isActive(child?.url) ? 'primary' : 'none'}
                        h='50px'
                        className='hover:bg-primary-400'
                        w="180px"
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
