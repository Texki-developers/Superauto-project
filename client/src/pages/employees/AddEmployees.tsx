import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import InputBox from '../../components/formComponents/inputBox/InputBox';
import SaveCancelButtons from '../../components/save-cancel-buttons/SaveCancelButtons';
import { IEmployee } from '../../types/employees/employees';

interface IProps {
  onCancelClick: () => void;
  register: UseFormRegister<IEmployee>;
  control: Control<IEmployee>;
  errors: FieldErrors<IEmployee>;
  reset: (values?: IEmployee) => void;
}

const AddEmployees = ({ onCancelClick, reset, register, errors }: IProps) => {
  const defaultValues: IEmployee = {
    name: '', // Default value for name
    phoneNumber: '', // Default value for phoneNumber
    salary: 10000, // Default value for salary
  };

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
      <SaveCancelButtons onCancelClick={onCancelClick} onResetClick={() => { reset(defaultValues) }} type='submit' />
    </div>
  );
};

export default AddEmployees;

