import Button from '../../components/button.tsx/Button';
import InputBox from '../../components/formComponents/inputBox/InputBox';
import AddIcon from '../../assets/header-icons/add-icon.svg';
import removeIcon from '../../assets/header-icons/remove-icon.svg';
import SelectInput from '../../components/formComponents/selectInput/SelectInput';
import {
  AssignVehiclesProps,
  IassignFormInput,
} from '../../types/pages/finance';
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import SaveCancelButtons from '../../components/save-cancel-buttons/SaveCancelButtons';
import { useState } from 'react';

export default function AssignVehicles({ setAssign }: AssignVehiclesProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<IassignFormInput>({
    defaultValues: {
      vehicle: [{ regNum: '', amount: 0 }],
    } as IassignFormInput,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vehicle',
  });

  const selectOption = [
    {
      value: 'kl 47 k 3300',
      label: 'Kl 47 k 3300',
    },
    {
      value: 'kl 47 p 3300',
      label: 'Kl 47 k 3300',
    },
  ];

  const onSubmit: SubmitHandler<IassignFormInput> = (data) => {
    console.log(data, 'The data');

    setAssign(false);
  };

  const handleAddField = () => {
    const values = getValues();
    const lastField = values.vehicle[values.vehicle.length - 1];

    if (lastField.regNum && lastField.amount) {
      setErrorMsg(null);
      append({ regNum: '', amount: 0 });
    } else {
      setErrorMsg('Please fill out all fields before adding a new one.');
    }
  };

  const handleRemoveField = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      setErrorMsg('Cannot remove the last field.');
    }
  };
  const handleFormSubmit = handleSubmit(onSubmit);
  return (
    <div className='flex flex-col gap-6'>
      <form
        className='flex w-full flex-col gap-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className='flex w-full items-end gap-6'>
              <SelectInput
                options={selectOption}
                name={`vehicle[${index}].regNum`}
                label='Registration Number'
                control={control}
                required={true}
                error={errors}
              />

              <InputBox
                error={errors}
                required={true}
                name={`vehicle[${index}].amount`}
                type='number'
                label='Amount'
                register={register}
              />

              <div>
                <Button
                  className='!gap-0 !px-3'
                  iconStyle={{ width: '1rem', textAlign: 'center' }}
                  text=''
                  type='button'
                  bg='primary'
                  onClick={
                    index === fields.length - 1
                      ? handleAddField
                      : () => handleRemoveField(index)
                  }
                  icon={
                    <img
                      alt='AddIcon'
                      className={index === fields.length - 1 ? 'w-6' : 'w-10'}
                      src={index === fields.length - 1 ? AddIcon : removeIcon}
                    />
                  }
                />
              </div>
            </div>
          ))}
          {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
        </div>
        <SaveCancelButtons
          onCancelClick={() => setAssign(false)}
          onSaveClick={handleFormSubmit}
          type='submit'
          hideReset
        />
      </form>
    </div>
  );
}
