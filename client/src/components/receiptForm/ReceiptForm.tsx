import { useForm } from "react-hook-form";
import InputBox from "../formComponents/inputBox/InputBox"
import ModalWrapper from "../modalWrapper"
import SaveCancelButtons from "../save-cancel-buttons/SaveCancelButtons"
import CreateSelectInput from "../formComponents/creatableSelect/CreatableSelect";
import { SetStateAction, useState } from "react";
import SelectInput from "../formComponents/selectInput/SelectInput";
import useGetDropdownData from "../../hooks/useGetDropdownData.hook";
import { IFormData, IReceiptBodyData, IReceiptResData } from "../../types/receipt/receipt";
import { paymentTypesWithName } from "../../config/paymentTypes.data";
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
const ReceiptForm = ({ setShow }: IProps) => {
    const [isNew, setIsNew] = useState<boolean>(false)
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({ defaultValues });
    const onClose = () => {
        reset()
        setShow("")
    }
    const { data, isPending } = useGetDropdownData(null, 'accounts/list/getAllAccounts')
    const { toastError, toastLoading, toastSuccess } = useToast()
    const onSubmit = async (data: IFormData) => {
        const body = {
            "paymentFrom": Number(data?.paymentFrom?.account_id),
            "paymentTo": data?.paymentTo?.value,
            "description": data?.description,
            "date": data?.date,
            "amount": Number(data?.amount)
        }
        const id = toastLoading('Loading...')
        try {
            const data = await AuthApiService.postApi<IReceiptBodyData, IReceiptResData>('accounts/book/reciept', body);
            if (data?.status === 'error') {
                toastError(id, data?.message)
                setShow("")
                return
            }
            toastSuccess(id, "Receipt Added successfully")
            setShow("")
            reset()
        } catch (error) {
            toastError(id, "Something went wrong")
        }
    }
    return (
        <ModalWrapper onClose={onClose} title="Add Receipt">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-2">

                    <CreateSelectInput
                        label='Payment From'
                        // required
                        options={data?.data}
                        labelName="name"
                        isLoading={isPending}
                        valueName="account_id"
                        control={control}
                        setIsNew={setIsNew}
                        placeholder='Payment From'
                        error={errors}
                        name='paymentFrom'
                    />
                    <SelectInput
                        label='Payment To'
                        required
                        control={control}
                        options={paymentTypesWithName}
                        placeholder='Payee'
                        error={errors}
                        name='paymentTo'
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

export default ReceiptForm
