import { useForm } from "react-hook-form";
import InputBox from "../formComponents/inputBox/InputBox"
import ModalWrapper from "../modalWrapper"
import SaveCancelButtons from "../save-cancel-buttons/SaveCancelButtons"
import { SetStateAction } from "react";
import SelectInput from "../formComponents/selectInput/SelectInput";
import AuthApiService from "../../services/api-services";
import { IExpenseFormData } from "../../types/expenseForm/expenseForm";
import useToast from "../../hooks/useToast.hook";
import useGetDropdownData from "../../hooks/useGetDropdownData.hook";

interface IProps {
    setShow: React.Dispatch<SetStateAction<string>>
}


const defaultValues: IExpenseFormData = {
    expenseTo: '14', // Assuming the value '14' corresponds to one of the options
    description: "This is description",
    date: "2024-07-03T01:25:38.835Z",
    amount: 1000
};
const ExpenseForm = ({ setShow }: IProps) => {
    const { data } = useGetDropdownData(null, 'accounts/list/getAllAccounts')
    console.log(data)

    const { register, handleSubmit, control, formState: { errors } } = useForm<IExpenseFormData>({
        defaultValues
    });

    const onClose = () => {
        setShow("")
    }

    const { toastError, toastLoading, toastSuccess } = useToast()
    const onSubmit = async (data: IExpenseFormData) => {
        const body = {
            expenseTo: data.expenseTo,
            description: data.description,
            date: data.date,
            amount: data.amount
        };
        const id = toastLoading('Loading...')
        try {
            const data = await AuthApiService.postApi<IExpenseFormData, any>('accounts/book/other-expense', body);
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

    const options = [
        {
            value: 'Cash',
            label: 'Cash'
        },
        {
            value: 'Credit Card',
            label: 'Credit Card'
        },
        {
            value: 'Bank Transfer',
            label: 'Bank Transfer'
        }
    ];

    return (
        <ModalWrapper onClose={onClose} title="Add Expense">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-2">

                    <SelectInput
                        label='Expense To'
                        required
                        control={control}
                        options={options}
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
