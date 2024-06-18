import Button from '../button.tsx/button';
import DragAndDrop from '../dragAndDrop/dragAndDrop';
import InputBox from '../inputBox/inputBox';
import SelectInput from '../selectInput/selectInput';

interface IProps {
  onCancelClick: () => void;
}
const AddvehicleForm = ({ onCancelClick }: IProps) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <div className='bg-white-100 grid w-full grid-rows-[1fr_80px] rounded p-5'>
      <form className='grid h-full w-full grid-cols-[1fr_300px] gap-3'>
        <div className='grid gap-4'>
          <h1 className='primary-heading'>Vehicle Details</h1>
          <div className='grid grid-cols-2 gap-3'>
            <div className='first-section grid gap-3'>
              <div className='form-items grid gap-2'>
                <SelectInput
                  label='Party'
                  isSearchable
                  placeholder='Select Party Name'
                  options={options}
                  onChange={(value) => {
                    console.log(value);
                  }}
                  required
                />
                <InputBox
                  label='Registration Number'
                  placeholder='Enter Registration Number'
                  onChange={() => {}}
                  required
                />
                <SelectInput
                  label='Model'
                  isSearchable
                  placeholder='Select Model'
                  options={options}
                  onChange={(value) => {
                    console.log(value);
                  }}
                  required
                />
                <InputBox
                  label='Purchase Rate'
                  placeholder='Enter Purchase Rate'
                  onChange={() => {}}
                  type='number'
                  required
                />
                <InputBox
                  label='Balance'
                  placeholder='Enter Balance'
                  onChange={() => {}}
                  type='number'
                />
                <InputBox
                  label='Purchase Date'
                  placeholder='Select Purchase Date'
                  onChange={() => {}}
                  type='date'
                  required
                />
              </div>
            </div>
            <div>
              <div className='second-section grid gap-2'>
                <InputBox
                  label='Ownership'
                  placeholder='Enter Vehicle Ownership Name'
                  onChange={() => {}}
                  required
                />
                <SelectInput
                  label='Brand'
                  isSearchable
                  placeholder='Select Brand'
                  options={options}
                  onChange={(value) => {
                    console.log(value);
                  }}
                  required
                />
                <InputBox
                  label='Year of Manufacture'
                  placeholder='Enter Year of Manufacture'
                  onChange={() => {}}
                  type='number'
                  value={2018}
                  required
                />
                <InputBox
                  label='Purchase Amount'
                  placeholder='Enter Purchase Amount'
                  onChange={() => {}}
                  type='number'
                  required
                />
                <InputBox
                  label='Insurance Date'
                  placeholder='Select Insurance Date'
                  onChange={() => {}}
                  type='date'
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className='primary-heading'>Delivery Services</h1>
            <div className='grid grid-cols-2 gap-3 pt-1'>
              <SelectInput
                label='Delivery Service'
                placeholder='Select Delivery Service'
                onChange={() => {}}
                options={options}
              />
              <InputBox
                label='Delivery Amount'
                placeholder='Enter Delivery Amount'
                onChange={() => {}}
                type='number'
              />
            </div>
          </div>
        </div>
        <div className='documents'>
          <h1 className='primary-heading'>Documents</h1>
          <div className='grid gap-2 pt-3'>
            <DragAndDrop label='RC Book' />
            <DragAndDrop label='RC Book' />
            <DragAndDrop label='RC Book' />
          </div>
        </div>
      </form>
      <div>
        <div className='button-wrapper flex h-full w-full items-center justify-between'>
          <Button
            className='bg-gray-300 font-semibold text-black-400'
            w='100px'
            text='Reset'
          />
          <div className='save-cancel-btn flex gap-3'>
            <Button
              onClick={() => {
                onCancelClick();
              }}
              w='150px'
              className='bg-failureRed'
              text='Cancel'
            />
            <Button bg='primary' w='150px' text='Save' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddvehicleForm;
