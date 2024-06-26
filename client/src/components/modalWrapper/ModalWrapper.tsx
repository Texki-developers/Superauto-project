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
        className='bg-white-100 min-h-[150px] min-w-[600px] max-h-[95vh] rounded-md p-3 overflow-y-auto'
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapperComponent;
