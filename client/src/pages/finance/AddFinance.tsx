import InputBox from '../../components/formComponents/inputBox/InputBox';
import SaveCancelButtons from '../../components/save-cancel-buttons/SaveCancelButtons';

const AddFinance = () => {
  return (
    <div className='grid gap-3'>
      <div className='flex gap-2'>
        <InputBox
          label='Name'
          required
          onChange={() => {}}
          placeholder='John Doe'
        />
        <InputBox
          label='Phone Number'
          onChange={() => {}}
          placeholder='Mobile'
        />
      </div>
      <SaveCancelButtons hideReset />
    </div>
  );
};

export default AddFinance;
