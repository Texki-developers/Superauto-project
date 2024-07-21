/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDropzone } from 'react-dropzone';
import UploadIcon from '../../../assets/icons/upload-icon';
import { useCallback } from 'react';
import DoneIcon from '../../../assets/icons/Done.icon';

interface iDragAndDropProps {
  label?: string;
  required?: boolean;
  name: string;
  placeholder?: string;
  setValue: any;
  watchValue: any;
}

const DragAndDrop = (props: iDragAndDropProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDrop = useCallback((acceptedFiles: any) => {
    props.setValue(props?.name, acceptedFiles?.[0]);
  }, [props])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <>
      <div className='grid gap-1'>
        <div className="flex justify-between">
          <label className='input-label'>
            {props?.label}
            {props?.required && <span>*</span>}
          </label>
          {props?.watchValue && <p onClick={() => props?.setValue(props?.name, '')} className="text-sm text-failureRed cursor-pointer ">Reset</p>}
        </div>
        <div
          {...getRootProps()}
          className={`h-[100px] grid border-spacing-2 place-items-center rounded-lg border ${isDragActive ? 'border-solid border-primary-500' : 'border-dashed border-primary-300'
            } p-3`}
        >
          <input {...getInputProps()} name={props.name} />
          {!props?.watchValue ? <UploadIcon /> :
            <DoneIcon />}
          <p className='text-center text-[.7rem]'>{!props?.watchValue ? (props?.placeholder ?? 'Click here or drop files to upload') : props?.watchValue?.name ?? props?.watchValue}</p>
        </div>
      </div>
    </>
  );
};

export default DragAndDrop;
