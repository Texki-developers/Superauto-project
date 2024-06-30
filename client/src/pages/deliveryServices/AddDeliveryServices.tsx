import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import InputBox from '../../components/formComponents/inputBox/InputBox';
import SaveCancelButtons from '../../components/save-cancel-buttons/SaveCancelButtons';
import { IDeliveryService } from '../../types/deliveryServices/deliveryServices';

interface IProps {
  onCancelClick: () => void;
  register: UseFormRegister<IDeliveryService>;
  control: Control<IDeliveryService>;
  errors: FieldErrors<IDeliveryService>;
  reset: (values?: IDeliveryService) => void;
}

const AddDeliveryServices = ({ onCancelClick, reset, register, errors }: IProps) => {

  return (
    <div className='grid gap-3'>
      <div className="grid grid-cols-2 gap-2">
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
          required
          register={register}
          placeholder='Mobile'
          error={errors}
          name='phoneNumber'
        />
      </div>
      <SaveCancelButtons
        onCancelClick={onCancelClick}
        type='submit'
        onResetClick={() => reset()}
      />
    </div>
  );
};



export default AddDeliveryServices