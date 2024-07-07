import React, { SetStateAction, useState } from "react"
import ModalWrapper from "../../../components/modalWrapper"
import AddvehicleForm from "../../../components/vehicles/AddVehicleForm"
import CloseIcon from '../../../assets/icons/close-icon';
import SalesReturnForm from "./SalesReturnForm";
import Tabs from "../../../components/exchangeVehicleComponent/Tabs";
import { useForm } from "react-hook-form";
import { IBranAndModel, IVehicleAddFormValues } from "../../../types/vehicle/addVehicle";
import { IExchangeVehicleDetails, IVehicleNewFormValues } from "../../../types/vehicle/sellVehicle";
import useGetApis from "../../../hooks/useGetApi.hook";
import { useQuery } from "@tanstack/react-query";
import useToast from "../../../hooks/useToast.hook";
import AuthApiService from "../../../services/api-services";


const tabs = ['Sales Return', 'New Vehicle']

interface IProps {
    showPopup: React.Dispatch<SetStateAction<boolean>>;
    setExchangeDet: React.Dispatch<SetStateAction<IExchangeVehicleDetails | null>>;
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
const defaultValuesNew: IVehicleNewFormValues = {
    registrationNumber: {
        value: '',
        label: ''
    },
    value: '',
    purchaseDate: ''

}
const ExchangeVehicle = ({ showPopup, setExchangeDet }: IProps) => {
    const { register, handleSubmit, reset, watch, setValue, setError, formState: { errors }, control } = useForm({
        defaultValues
    })
    const { toastError, toastLoading, toastSuccess } = useToast()
    const { callApi } = useGetApis()
    const url = `inventory/model-brand/vehicle`
    const fetchBrandModal = (): Promise<{ data: IBranAndModel[] } | undefined> => callApi(url)
    const { data: brandData, isPending: brandLoading } = useQuery({ queryKey: ['brand/model-brand'], queryFn: fetchBrandModal })

    const { register: registerNew, handleSubmit: handleSubmitNew, reset: resetNew, formState: { errors: errorsNew }, control: controlNew } = useForm({
        defaultValues: defaultValuesNew
    })
    const [selectedTab, setSelectedTab] = useState(0)
    const onClose = () => {
        showPopup(false)
    }
    const onNewVehicleSubmit = async (data: IVehicleAddFormValues) => {
        const formData = new FormData();
        formData.append(data?.party.__isNew__ ? 'partyName' : 'accountId', data?.party.value)
        formData.append('ownershipName', data.ownership);
        formData.append('registrationNumber', data.registrationNumber);
        formData.append('brandModel_id', 'null'); // You can update this value as needed
        formData.append('yearOfManufacture', data.yearOfManufacture);
        formData.append('purchaseRate', data.purchaseRate);
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
        formData.append('isNew', data?.brand?.__isNew__ ? 'true' : 'false');
        data?.deliveryServicePhoneNumber?.length > 0 && data?.deliveryService.__isNew__ && formData.append('deliveryServicePhoneNumber', data?.deliveryServicePhoneNumber)
        data?.partyPhoneNumber?.length > 0 && data?.party.__isNew__ && formData.append('partyPhoneNumber', data?.partyPhoneNumber)
        const id = toastLoading('Loading...');
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any = await AuthApiService.postApiFormData<FormData, any>('inventory/exchange/vehicle', formData,)
            if (data?.status === "error") {
                toastError(id, data?.message)
                return
            }
            if (data?.data?.data) {
                const res = data?.data?.data
                setExchangeDet({ id: res?.inventory_id, regNumb: res?.registration_number, rate: res?.purchase_rate })
            }
            toastSuccess(id, 'Vehicle added successfully')
            showPopup(false)
        } catch (error) {
            toastError(id, 'Something went wrong')
        }
    }
    const onSalesReturn = async (data: IVehicleNewFormValues) => {
        const body = {
            registrationNumber: data?.registrationNumber?.value,
            dateOfPurchase: data?.purchaseDate,
            salesReturn: true,
            purchaseRate: data?.value
        }
        const id = toastLoading('Loading...');
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = await AuthApiService.postApi<any, any>('inventory/exchange/vehicle', body,)
            if (data?.status === "error") {
                toastError(id, data?.message)
                return
            }
            setExchangeDet({ id: data?.registrationNumber?.value, regNumb: data?.registrationNumber?.label, rate: data?.value })
            toastSuccess(id, 'Vehicle added successfully')
            showPopup(false)
        } catch (error) {
            toastError(id, 'Something went wrong')
        }
    }
    return (
        <div className="">
            <ModalWrapper hideHeading onClose={onClose}>
                <div className="grid grid-rows-[60px_1fr] h-full">
                    <div className="tab relative w-full grid place-items-center pb-3">
                        <Tabs tabs={tabs} setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
                        <div
                            onClick={onClose}
                            className='absolute right-0 top-0 close grid h-[25px] w-[25px] cursor-pointer place-items-center rounded-full bg-failureRed'
                        >
                            <CloseIcon />
                        </div>
                    </div>

                    {
                        selectedTab === 0 ?
                            <form onSubmit={handleSubmitNew(onSalesReturn)}>
                                <SalesReturnForm reset={resetNew} register={registerNew} errors={errorsNew} control={controlNew} onCancelClick={onClose} />
                            </form>
                            :
                            <form onSubmit={handleSubmit(onNewVehicleSubmit)}>
                                <AddvehicleForm brands={brandData?.data} brandLoading={brandLoading} reset={reset} setValue={setValue} watch={watch} register={register} control={control} errors={errors} onCancelClick={onClose} />
                            </form>
                    }

                </div>
            </ModalWrapper>
        </div>
    )
}

export default ExchangeVehicle