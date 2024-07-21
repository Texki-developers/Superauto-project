/* eslint-disable @typescript-eslint/no-explicit-any */
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
import useToast from '../../hooks/useToast.hook';
import AuthApiService from '../../services/api-services';
import { IAssignApiBody } from '../../types/apimodal/apimodal';
import { useQuery } from '@tanstack/react-query';
import useGetApis from '../../hooks/useGetApi.hook';

export default function AssignVehicles({ setAssign, itemId, parent, apiUrl }: AssignVehiclesProps) {
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

  const { toastError, toastLoading, toastSuccess } = useToast()
  const { callApi } = useGetApis()
  const url = `inventory/list/vehicle/registration-number`
  const fetchData = () => callApi(url);
  const { data } = useQuery({ queryKey: [url], queryFn: fetchData })
  const onSubmit: SubmitHandler<IassignFormInput> = async (data: any) => {
    const id = toastLoading('Loading...')
    // creating the body
    const Vehicles = data?.vehicle?.map((item: any) => (
      {
        regNum: item?.regNum?.registration_number,
        amount: Number(item?.amount),
        [parent]: itemId
      }
    ))
    try {
      const data = await AuthApiService.postApi<IAssignApiBody, any>(`inventory/assign-vehicle${apiUrl}`, { Vehicles })
      if (data?.status === "error") {
        toastError(id, data?.message)
        setAssign(false)
        return
      }
      setAssign(false);
      toastSuccess(id, 'Vehicle added successfully')
    } catch (error) {
      setAssign(false);
      toastError(id, 'Something went wrong')
    }

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
                options={data?.data}
                name={`vehicle[${index}].regNum`}
                label='Registration Number'
                control={control}
                valueName='inventory_id'
                labelName='registration_number'
                required={true}
                error={errors}
                minH={80}
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
                  className='!gap-0 !px-3 mb-4'
                  iconStyle={{ width: '1rem', textAlign: 'center' }}
                  text=''
                  type='button'
                  bg={index === fields.length - 1 ? 'primary' : 'red'}
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
          type='submit'
          hideReset
        />
      </form>
    </div>
  );
}
