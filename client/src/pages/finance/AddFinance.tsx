import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import InputBox from '../../components/formComponents/inputBox/InputBox';
import SaveCancelButtons from '../../components/save-cancel-buttons/SaveCancelButtons';
import { IFinance } from '../../types/finance/finance';
import { useEffect } from 'react';
import { IListAccountData } from '../../types/common/common';

interface IProps {
  onCancelClick: () => void;
  register: UseFormRegister<IFinance>;
  control: Control<IFinance>;
  errors: FieldErrors<IFinance>;
  isEdit?: boolean;
  financeData?: IListAccountData | null;
  reset: (values?: IFinance) => void;
}

const AddFinance = ({ onCancelClick, reset, financeData, register, isEdit, errors }: IProps) => {
  useEffect(() => {
    if (isEdit && financeData) {
      reset({
        name: financeData?.name,
        phoneNumber: financeData?.contact_info
      })
    }
  }, [isEdit])

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
          register={register}
          placeholder='Mobile'
          error={errors}
          required
          name='phoneNumber'
        />
      </div>
      <SaveCancelButtons
        onCancelClick={onCancelClick}
        onResetClick={() => { reset() }}
        type='submit'
        hideReset
      />
    </div>
  );
};

export default AddFinance;

