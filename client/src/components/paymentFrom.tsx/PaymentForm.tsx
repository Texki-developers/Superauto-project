import { useForm } from "react-hook-form";
import InputBox from "../formComponents/inputBox/InputBox"
import ModalWrapper from "../modalWrapper"
import SaveCancelButtons from "../save-cancel-buttons/SaveCancelButtons"
import CreateSelectInput from "../formComponents/creatableSelect/CreatableSelect";
import { SetStateAction, useState } from "react";
import SelectInput from "../formComponents/selectInput/SelectInput";
import { IFormData, IPaymentBodyData, IPaymentResData } from "../../types/paymentForm/paymentForm";
import { paymentTypesWithName } from "../../config/paymentTypes.data";
import useGetDropdownData from "../../hooks/useGetDropdownData.hook";
import useToast from "../../hooks/useToast.hook";
import AuthApiService from "../../services/api-services";

interface IProps {
    setShow: React.Dispatch<SetStateAction<string>>
}

const defaultValues: IFormData = {
    paymentTo: {},
    paymentFrom: {},
    phoneNumber: '',
    description: '',
    date: '',
    amount: null,
};

const PaymentForm = ({ setShow }: IProps) => {
    const [isNew, setIsNew] = useState<boolean>(false)
    const { register, handleSubmit, control, formState: { errors } } = useForm({ defaultValues });
    const { data, isPending } = useGetDropdownData(null, 'accounts/list/getAllAccounts')
    const onClose = () => {
        setShow('')
    }
    const { toastError, toastLoading, toastSuccess } = useToast()
    const onSubmit = async (data: IFormData) => {
        const body = {
            "paymentFrom": data?.paymentFrom?.value,
            "paymentTo": Number(data?.paymentTo?.account_id),
            "description": data?.description,
            "date": data?.date,
            "amount": Number(data?.amount)
        }
        const id = toastLoading('Loading...')
        try {
            const data = await AuthApiService.postApi<IPaymentBodyData, IPaymentResData>('accounts/book/payment', body);
            if (data?.status === 'error') {
                toastError(id, data?.message)
                setShow("")
                return
            }
            toastSuccess(id, "Payment Added successfully")
            setShow("")
        } catch (error) {
            toastError(id, "Something went wrong")
        }
    }
    return (
        <ModalWrapper onClose={onClose} title="Add Payment">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-2">
                    <CreateSelectInput
                        label='Payment To'
                        required
                        control={control}
                        placeholder='Payee'
                        options={data?.data}
                        labelName="name"
                        isLoading={isPending}
                        valueName="account_id"
                        error={errors}
                        setIsNew={setIsNew}
                        name='paymentTo'
                    />
                    <SelectInput
                        label='Payment From'
                        required
                        options={paymentTypesWithName}
                        control={control}
                        placeholder='Payment From'
                        error={errors}
                        name='paymentFrom'
                    />
                    {
                        isNew && <InputBox
                            label='Phone Number'
                            required
                            register={register}
                            placeholder='Phone Number'
                            error={errors}
                            name='Phone Number'
                        />
                    }
                    <InputBox
                        label='Description'
                        register={register}
                        required
                        placeholder='Description'
                        error={errors}
                        name='description'
                    />
                    <InputBox
                        label='Date'
                        register={register}
                        required
                        placeholder='Date'
                        error={errors}
                        name='date'
                        type='date'
                    />
                    <InputBox
                        label='Amount'
                        register={register}
                        placeholder='Amount'
                        error={errors}
                        required
                        name='amount'
                        type='number'
                    />
                </div>
                <SaveCancelButtons
                    onCancelClick={onClose}
                    type='submit'
                    hideReset
                />
            </form>
        </ModalWrapper>
    )
}

export default PaymentForm
