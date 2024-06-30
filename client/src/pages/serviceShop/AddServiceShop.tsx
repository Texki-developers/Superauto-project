import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import InputBox from '../../components/formComponents/inputBox/InputBox';
import SaveCancelButtons from '../../components/save-cancel-buttons/SaveCancelButtons';
import { IServiceShop } from '../../types/serviceShop/serviceShop';

interface IProps {
  onCancelClick: () => void;
  register: UseFormRegister<IServiceShop>;
  control: Control<IServiceShop>;
  errors: FieldErrors<IServiceShop>;
  reset: (values?: IServiceShop) => void;
}

const AddServiceShop = ({ onCancelClick, reset, register, errors, }: IProps) => {
  return (
    <div className='grid gap-3'>
      <div className='flex gap-2'>
        <InputBox
          label='Name'
          required
          register={register}
          placeholder='John Doe'
          error={errors}
          name='name'
        />
        <InputBox
          label='Phone Number'
          name='phoneNumber'
          register={register}
          error={errors}
          required
          placeholder='Mobile'
        />
      </div>
      <SaveCancelButtons onCancelClick={onCancelClick} onResetClick={() => { reset() }} type='submit' />
    </div>
  );
};

export default AddServiceShop;
