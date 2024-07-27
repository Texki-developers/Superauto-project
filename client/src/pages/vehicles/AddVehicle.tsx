import { SetStateAction, useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import AddvehicleForm from '../../components/vehicles/AddVehicleForm';
import { useForm } from 'react-hook-form';
import { IBranAndModel, IVehicleAddFormValues } from '../../types/vehicle/addVehicle';
import AuthApiService from '../../services/api-services';
import useToast from '../../hooks/useToast.hook';
import useGetApis from '../../hooks/useGetApi.hook';
import { useQuery } from '@tanstack/react-query';
// import useQueryGetApi from '../../hooks/useQueryGetApi.hook';
import Loading from '../../components/loading/Loading';
import moment from 'moment';

interface IProps {
  setShowAddPage: React.Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  selectedItem?: string | number;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<SetStateAction<boolean>>;
}

const defaultValues: IVehicleAddFormValues = {
  party: {
    value: '',
    label: '',
  },
  registrationNumber: '',
  model: {
    label: '',
    value: '',
  },
  purchaseRate: '',
  balance: '',
  brandModel_id: '',
  purchaseDate: '',
  insurance: null,
  proof: null,
  rcBook: null,
  ownership: '',
  brand: {
    value: '',
    label: '',
  },
  yearOfManufacture: '2024',
  purchaseAmount: '',
  insuranceDate: '',
  deliveryService: {
    value: '',
    label: '',
  },
  deliveryAmount: '',
  partyPhoneNumber: '',
  deliveryServicePhoneNumber: ''
};

const AddVehicle = ({ setShowAddPage, refetch, setIsEdit, selectedItem, isEdit }: IProps) => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors }, control } = useForm({
    defaultValues
  })
  const [openStocks, setOpenStocks] = useState(false)
  const { toastError, toastLoading, toastSuccess } = useToast()
  const editApiurl = `inventory/list/edit-vehicle/?inventoryId=${selectedItem}`
  const { callApi } = useGetApis();
  const fetchData = () => callApi(editApiurl);
  const { data: vehicleData, isPending } = useQuery({ queryKey: [editApiurl], queryFn: fetchData, enabled: isEdit })
  const url = `inventory/model-brand/vehicle`
  const fetchBrandModal = (): Promise<{ data: IBranAndModel[] } | undefined> => callApi(url)
  const { data: brandData, isPending: brandLoading } = useQuery({ queryKey: ['brand/model-brand'], queryFn: fetchBrandModal })
  useEffect(() => {
    if (vehicleData?.data && isEdit) {
      const mappedValues = {
        ...defaultValues,
        party: {
          value: vehicleData?.data?.account_id,
          label: vehicleData?.data?.Account?.name,
        },
        brand: {
          label: vehicleData?.data?.BrandModel.brand,
          value: vehicleData?.data?.brand_model_id.toString(),
        },
        model: {
          label: vehicleData?.data?.BrandModel.model,
          value: vehicleData?.data?.brand_model_id.toString(),
        },
        registrationNumber: vehicleData?.data?.registration_number,
        purchaseRate: vehicleData?.data?.purchase_rate.toString(),
        purchaseDate: vehicleData?.data?.date_of_purchase,
        insurance: vehicleData?.data?.insuranceDoc?.name,
        proof: vehicleData?.data?.proofDoc?.name,
        rcBook: vehicleData?.data?.rcBook?.name,
        ownership: vehicleData?.data?.ownership_name,
        yearOfManufacture: vehicleData?.data?.year_of_manufacture.toString(),
        insuranceDate: moment(vehicleData?.data?.insurance_date0)?.format('YYYY-MM-DD'),
      };
      console.log(mappedValues?.rcBook, mappedValues?.insurance, mappedValues?.proof)
      reset(mappedValues);
      setValue('model', {
        label: vehicleData?.data?.BrandModel.model,
        value: vehicleData?.data?.brand_model_id.toString(),
      })

    }
  }, [vehicleData, brandData])
  const onCancelClick = () => {
    reset()
    setShowAddPage(false);
    setIsEdit && setIsEdit(false);
  };
  const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'Vehicles' },
    { name: 'Add Vehicles' },
  ];

  const onSubmit = async (data: IVehicleAddFormValues) => {
    const formData = new FormData();
    formData.append(data?.party.__isNew__ ? 'partyName' : 'accountId', data?.party.value)
    formData.append('ownershipName', data.ownership);
    formData.append('registrationNumber', data.registrationNumber);
    data?.brandModel_id && formData.append('brandModel_id', data?.brandModel_id); // You can update this value as needed
    formData.append('yearOfManufacture', data.yearOfManufacture);
    formData.append('purchaseRate', data.purchaseRate);
    formData.append('purchaseAmount', data.purchaseAmount);
    formData.append('saleStatus', 'false');
    formData.append('insuranceDate', data.insuranceDate);
    formData.append(data?.deliveryService.__isNew__ ? 'deliveryName' : 'deliveryService', data.deliveryService.value);
    formData.append('deliveryAmount', data.deliveryAmount);
    data.rcBook && formData.append('rcBook', data.rcBook);
    data.insurance && formData.append('insuranceDoc', data.insurance);
    data.proof && formData.append('proofDoc', data.proof);
    formData.append('dateOfPurchase', data.purchaseDate);
    formData.append('model', data.model.value);
    formData.append('brand', data.brand.value);
    formData.append('salesReturn', "false");
    formData.append('isDelivery', `${!!data?.deliveryService.value}`);
    formData.append('isNew', data?.brand?.__isNew__ ? 'true' : 'false');
    data?.deliveryServicePhoneNumber?.length > 0 && data?.deliveryService.__isNew__ && formData.append('deliveryServicePhoneNumber', data?.deliveryServicePhoneNumber)
    data?.partyPhoneNumber?.length > 0 && data?.party.__isNew__ && formData.append('partyPhoneNumber', data?.partyPhoneNumber)
    isEdit && selectedItem && formData.append('vehicleId', selectedItem.toString())
    const id = toastLoading('Loading...');
    try {
      const url = openStocks ? 'inventory/opening-stock' : isEdit ? 'inventory/edit/vehicle' : 'inventory/add/vehicle'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await AuthApiService.postApiFormData<FormData, any>(url, formData,)
      if (data?.status === "error") {
        toastError(id, data?.message)
        return
      }
      toastSuccess(id, isEdit ? 'Vehicle Updated Successfully' : 'Vehicle added successfully')
      setShowAddPage(false)
    } catch (error) {
      toastError(id, 'Something went wrong')
    } finally {
      refetch()
    }
  }
  useEffect(() => {
    const purchaseRate = watch('purchaseRate')
    const purchaseAmount = watch('purchaseAmount')
    if (purchaseAmount || purchaseRate) {
      setValue('balance', `${Number(purchaseRate ?? 0) - Number(purchaseAmount ?? 0)}`)
    }
  }, [watch('purchaseRate'), watch('purchaseAmount')])
  console.log(watch('party'))
  if (isPending && isEdit) {
    return <Loading />
  }
  return (
    <div>
      <Header breadCrumbData={breadCrumbData} />
      <div className='pt-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddvehicleForm setOpenStocks={setOpenStocks} showOpenStocks={!isEdit} brands={brandData?.data} brandLoading={brandLoading} reset={reset} setValue={setValue} watch={watch} register={register} control={control} errors={errors} onCancelClick={onCancelClick} />
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
