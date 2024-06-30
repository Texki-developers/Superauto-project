import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import InputBox from '../../components/formComponents/inputBox/InputBox';
import SaveCancelButtons from '../../components/save-cancel-buttons/SaveCancelButtons';
import { IOtherExpense } from '../../types/otherExpenses/otherExpenses';

interface IProps {
  onCancelClick: () => void;
  register: UseFormRegister<IOtherExpense>;
  control: Control<IOtherExpense>;
  errors: FieldErrors<IOtherExpense>;
  reset: (values?: IOtherExpense) => void;
}

const AddOtherExpenses = ({ onCancelClick, reset, register, errors }: IProps) => {
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
        <InputBox
          label='Salary (Per Month)'
          type='number'
          required
          register={register}
          placeholder='Salary'
          error={errors}
          name='salary'
        />
      </div>
      <SaveCancelButtons onCancelClick={onCancelClick} onResetClick={() => { reset() }} type='submit' />
    </div>
  );
};

export default AddOtherExpenses;

