import Button from '../button.tsx/button';

interface IProps {
  hideReset?: boolean;
  hideCancel?: boolean;
  hideSave?: boolean;
  onResetClick?: () => void;
  onSaveClick?: () => void;
  onCancelClick?: () => void;
}

const SaveCancelButtons = (props: IProps) => {
  return (
    <div className='buttons flex justify-between pt-3'>
      <div>
        {!props?.hideReset && (
          <Button
            onClick={() => {
              props?.onResetClick && props?.onResetClick();
            }}
            text='Reset'
            className='bg-gray-300'
          />
        )}
      </div>
      <div className='flex gap-2'>
        {!props?.hideCancel && (
          <Button
            onClick={() => {
              props?.onCancelClick && props?.onCancelClick();
            }}
            className='bg-failureRed'
            text='Cancel'
          />
        )}
        {!props?.hideSave && (
          <Button
            onClick={() => {
              props?.onSaveClick && props?.onSaveClick();
            }}
            bg='primary'
            text='Save'
          />
        )}
      </div>
    </div>
  );
};

export default SaveCancelButtons;
