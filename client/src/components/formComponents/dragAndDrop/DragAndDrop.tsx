import UploadIcon from '../../../assets/icons/upload-icon';

interface iDragAndDropProps {
  label?: string;
  required?: boolean;
  placeholder?: boolean;
}

const DragAndDrop = (props: iDragAndDropProps) => {
  return (
    <div className='gird gap-1'>
      <label className='input-label'>
        {props?.label}
        {props?.required && <span>*</span>}{' '}
      </label>
      <div className=' h-[100px] grid border-spacing-2 place-items-center rounded-lg border border-dashed border-primary-300 p-3'>
        <UploadIcon />
        <p className='text-center text-[.7rem]'>{props?.placeholder ?? 'Click here or drop files to upload'}</p>
      </div>
    </div>
  );
};

export default DragAndDrop;
