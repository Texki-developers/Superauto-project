import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import CheckBox from '../../components/formComponents/checkBox/CheckBox';
import InputBox from '../../components/formComponents/inputBox/InputBox';
import SaveCancelButtons from '../../components/save-cancel-buttons/SaveCancelButtons';
import { ICustomer } from '../../types/customers/customers';
import { IListAccountData } from '../../types/common/common';
import { useEffect } from 'react';

interface IProps {
  onCancelClick: () => void;
  register: UseFormRegister<ICustomer>;
  control: Control<ICustomer>;
  errors: FieldErrors<ICustomer>;
  reset: (values?: ICustomer) => void;
  data?: IListAccountData | null;
  isEdit?: boolean;
}



const AddCustomers = ({ onCancelClick, reset, isEdit, data, register, errors }: IProps) => {
  useEffect(() => {
    if (isEdit && data) {
      reset({
        name: data?.name,
        phoneNumber: data?.contact_info,
        isBroker: data?.category === 'BROKER'
      })
    }
  }, [isEdit])
  return (
    <div className='grid gap-3'>
      <div className="flex gap-2">
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
          register={register}
          required
          placeholder='Mobile'
          error={errors}
          name='phoneNumber'
        />
      </div>
      <CheckBox
        name='isBroker'
        register={register}
        error={errors}
        label='Broker'
      />
      <SaveCancelButtons
        type='submit'
        onCancelClick={onCancelClick}
        onResetClick={() => { reset() }}
      />
    </div>
  );
};

export default AddCustomers;


