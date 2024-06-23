import { createPortal } from 'react-dom';
import ModalWrapperComponent from './ModalWrapper';
import CloseIcon from '../../assets/icons/close-icon';

interface IModalWrapperProps {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}
const ModalWrapper = ({ children, title, onClose }: IModalWrapperProps) => {
  return (
    <div>
      {createPortal(
        <ModalWrapperComponent onClose={onClose}>
          <div className='flex justify-between pb-3'>
            <h1 className='common-heading'>{title}</h1>
            <div
              onClick={onClose}
              className='close grid h-[25px] w-[25px] cursor-pointer place-items-center rounded-full bg-failureRed'
            >
              <CloseIcon />
            </div>
          </div>
          {children}
        </ModalWrapperComponent>,
        document.getElementById('modal') as HTMLElement,
      )}
    </div>
  );
};

export default ModalWrapper;
