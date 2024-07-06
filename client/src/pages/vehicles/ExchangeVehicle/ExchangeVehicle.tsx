import React, { SetStateAction, useState } from "react"
import ModalWrapper from "../../../components/modalWrapper"
import AddvehicleForm from "../../../components/vehicles/AddVehicleForm"
import CloseIcon from '../../../assets/icons/close-icon';
import SalesReturnForm from "./SalesReturnForm";
import Tabs from "../../../components/exchangeVehicleComponent/Tabs";
import { useForm } from "react-hook-form";
import { IBranAndModel, IVehicleAddFormValues } from "../../../types/vehicle/addVehicle";
import { IVehicleNewFormValues } from "../../../types/vehicle/sellVehicle";
import useGetApis from "../../../hooks/useGetApi.hook";
import { useQuery } from "@tanstack/react-query";


const tabs = ['Sales Return', 'New Vehicle']

interface IProps {
    showPopup: React.Dispatch<SetStateAction<boolean>>;
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
    registrationNumber: '',
    value: ''
}
const ExchangeVehicle = ({ showPopup }: IProps) => {
    const { register, handleSubmit, reset, watch, setValue, formState: { errors }, control } = useForm({
        defaultValues
    })

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
    const onSalesSubmit = (data: IVehicleAddFormValues) => {
        console.log(data)
    }
    const onExchangeValue = (data: IVehicleNewFormValues) => {
        console.log(data)
    }
    const onCancelClick = () => { }
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
                            <form onSubmit={handleSubmit(onSalesSubmit)}>
                                <AddvehicleForm hideDeliveryServices brands={brandData?.data} brandLoading={brandLoading} reset={reset} setValue={setValue} watch={watch} register={register} control={control} errors={errors} onCancelClick={onCancelClick} />
                            </form> :
                            <form onSubmit={handleSubmitNew(onExchangeValue)}>
                                <SalesReturnForm reset={resetNew} register={registerNew} errors={errorsNew} control={controlNew} onCancelClick={onCancelClick} />
                            </form>
                    }

                </div>
            </ModalWrapper>
        </div>
    )
}

export default ExchangeVehicle