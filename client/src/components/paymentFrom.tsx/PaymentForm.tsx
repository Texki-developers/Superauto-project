import { useForm } from "react-hook-form";
import InputBox from "../formComponents/inputBox/InputBox"
import ModalWrapper from "../modalWrapper"
import SaveCancelButtons from "../save-cancel-buttons/SaveCancelButtons"
import CreateSelectInput from "../formComponents/creatableSelect/CreatableSelect";
import { SetStateAction, useState } from "react";
import SelectInput from "../formComponents/selectInput/SelectInput";

interface IProps {
    setShow: React.Dispatch<SetStateAction<string>>
}

const PaymentForm = ({ setShow }: IProps) => {
    const [isNew, setIsNew] = useState<boolean>(false)
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const onClose = () => {
        setShow('')
    }
    const onSubmit = (data: any) => {
        console.log(data);
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
    ]
    return (
        <ModalWrapper onClose={onClose} title="Add Payment">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-2">
                    <CreateSelectInput
                        label='Payment To'
                        required
                        control={control}
                        options={options}
                        placeholder='Payee'
                        error={errors}
                        setIsNew={setIsNew}
                        name='paymentTo'
                    />
                    <SelectInput
                        label='Payment From'
                        required
                        options={options}
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
