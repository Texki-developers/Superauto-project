import Button from '../button.tsx/Button';

interface IProps {
  hideReset?: boolean;
  hideCancel?: boolean;
  hideSave?: boolean;
  onResetClick?: () => void;
  onSaveClick?: () => void;
  onCancelClick?: () => void;
  type: 'button' | 'submit'
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
            type='button'
            className='bg-gray-300 text-black-300'


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
            type={props.type ?? 'button'}
            bg='primary'
            text='Save'
          />
        )}
      </div>
    </div>
  );
};

export default SaveCancelButtons;
