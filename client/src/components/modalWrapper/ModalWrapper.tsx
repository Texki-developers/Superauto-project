import React from 'react';

interface IModalWrapperComponentProps {
  children: React.ReactNode;
  onClose: () => void;
}
const ModalWrapperComponent = ({
  children,
  onClose,
}: IModalWrapperComponentProps) => {
  return (
    <div
      onClick={onClose}
      className='fixed grid h-screen w-screen place-items-center bg-black-100 backdrop-blur-sm'
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='bg-white-100 min-h-[150px] min-w-[600px] rounded-md p-3'
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapperComponent;
