import React from 'react';
import ArrowIcon from '../../assets/header-icons/arrowIcon';
import { IBreadCrumb } from '../../types/breadCrumb/breadCrumb';
import { Link } from 'react-router-dom';

interface IBreadCrumbProps {
  data: IBreadCrumb[];
}
const Breadcrumb = ({ data }: IBreadCrumbProps) => {
  return (
    <div className='flex items-center gap-[8px]'>
      {data?.map((item, index) => (
        <React.Fragment key={item?.name}>
          {item?.link ? (
            <>
              <Link
                to={item?.link}
                className='text-sm font-[600] text-black-300'
              >
                {item?.name}
              </Link>
              {index !== data?.length - 1 && <ArrowIcon />}
            </>
          ) : (
            <>
              <span className='text-sm text-gray-400'>{item?.name}</span>
              {index !== data?.length - 1 && <ArrowIcon />}

            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
