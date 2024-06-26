import InputBox from '../../components/formComponents/inputBox/InputBox';
import SaveCancelButtons from '../../components/save-cancel-buttons/SaveCancelButtons';

const AddOtherExpenses = () => {
  return (
    <div className='grid gap-3'>
      <div className="grid grid-cols-2 gap-2">
        <InputBox
          label='Name'
          required
          onChange={() => { }}
          placeholder='John Doe'
        />
        <InputBox
          required
          label='Phone Number'
          onChange={() => { }}
          placeholder='Mobile'
        />
        <InputBox
          required
          type='number'
          label='Salary (Per Month)'
          onChange={() => { }}
          placeholder='Salary'
        />
      </div>
      <SaveCancelButtons hideReset />
    </div>
  );
};

export default AddOtherExpenses;
