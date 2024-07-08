import { useForm } from "react-hook-form";
import InputBox from "../formComponents/inputBox/InputBox"
import ModalWrapper from "../modalWrapper"
import SaveCancelButtons from "../save-cancel-buttons/SaveCancelButtons"
import { SetStateAction } from "react";
import SelectInput from "../formComponents/selectInput/SelectInput";
import AuthApiService from "../../services/api-services";
import { IExpenseApiBody, IExpenseApiResData, IExpenseFormData } from "../../types/expenseForm/expenseForm";
import useToast from "../../hooks/useToast.hook";
import useGetDropdownData from "../../hooks/useGetDropdownData.hook";

interface IProps {
    setShow: React.Dispatch<SetStateAction<string>>
}


const defaultValues: IExpenseFormData = {
    expenseTo: null, // Assuming the value '14' corresponds to one of the options
    description: "",
    date: "",
    amount: null
};
const ExpenseForm = ({ setShow }: IProps) => {
    const { data } = useGetDropdownData(null, 'accounts/list/getAllAccounts')

    const { register, handleSubmit, control, formState: { errors } } = useForm<IExpenseFormData>({
        defaultValues
    });

    const onClose = () => {
        setShow("")
    }

    const { toastError, toastLoading, toastSuccess } = useToast()
    const onSubmit = async (data: IExpenseFormData) => {
        const body = {
            expenseTo: data?.expenseTo?.account_id as string,
            description: data?.description,
            date: data?.date,
            amount: data?.amount
        };
        const id = toastLoading('Loading...')
        try {
            const data = await AuthApiService.postApi<IExpenseApiBody, IExpenseApiResData>('accounts/book/other-expense', body);
            if (data?.status === 'error') {
                toastError(id, data?.message)
                setShow("")
                return
            }
            toastSuccess(id, "Expense Added successfully")
            setShow("")
        } catch (error) {
            toastError(id, "Something went wrong")
        }
    }
    return (
        <ModalWrapper onClose={onClose} title="Add Expense">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-2">

                    <SelectInput
                        label='Expense To'
                        required
                        control={control}
                        options={data?.data}
                        labelName="name"
                        valueName="account_id"
                        placeholder='Payee'
                        error={errors}
                        name='expenseTo'
                    />
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
    );
}

export default ExpenseForm;
