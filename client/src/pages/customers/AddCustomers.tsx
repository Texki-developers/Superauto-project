import CheckBox from '../../components/formComponents/checkBox/CheckBox';
import InputBox from '../../components/formComponents/inputBox/InputBox';
import SaveCancelButtons from '../../components/save-cancel-buttons/SaveCancelButtons';

const AddCustomers = () => {
  return (
    <div className='grid gap-3'>
      <div className="flex gap-2">
        <InputBox
          label='Name'
          required
          onChange={() => { }}
          placeholder='John Doe'
        />
        <InputBox
          label='Phone Number'
          onChange={() => { }}
          placeholder='Mobile'
        />
      </div>
      <CheckBox label='Broker' />
      <SaveCancelButtons hideReset />
    </div>
  );
};

export default AddCustomers;
