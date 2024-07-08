import AddIcon from '../../assets/header-icons/add-icon.svg';
import Button from '../button.tsx/Button';
import ReceiptIcon from '../../assets/icons/addReceipt.svg'
import PaymentIcon from '../../assets/icons/addPayment.svg'
import AddExpenses from '../../assets/icons/addExpense.svg'
import { SetStateAction, useState } from 'react';
import PaymentForm, { IProps } from '../paymentFrom.tsx/PaymentForm';
import ReceiptForm from '../receiptForm/ReceiptForm';
import ExpenseForm from '../expenseForm/ExpenseForm';


const addForms: { [key: string]: ({ setShow }: IProps) => JSX.Element } = {
    "payment": PaymentForm,
    "receipt": ReceiptForm,
    "expense": ExpenseForm
}
const getForm = (form: string, setShowForm: React.Dispatch<SetStateAction<string>>) => {
    const Component = addForms[form]
    return <Component setShow={setShowForm} />
}
const Addbutton = () => {
    const [showForm, setShowForm] = useState('')
    return (
        <>
            {
                showForm !== "" &&
                getForm(showForm, setShowForm)

            }
            <div className=" shadow-[0px_0px_5px_#00000044] cursor-pointer group addIcon grid place-items-center fixed w-14 h-14 right-3 bottom-3 rounded-full bg-[#4c5ce9d1]">
                <img alt='AddIcon' className='w-5' src={AddIcon} />
                <div className="group-hover:grid hidden absolute bottom-[100%]  right-2 p-2 gap-2 ">
                    <Button onClick={() => setShowForm('expense')} className='!w-[180px]' icon={<img
                        className='w-5 h-5'
                        src={AddExpenses} />
                    } text='Add Expense' bg='primary' />
                    <Button onClick={() => setShowForm('receipt')} icon={
                        <img className='w-5 h-5' src={ReceiptIcon} />
                    } text='Add Receipt' bg='primary' />
                    <Button onClick={() => setShowForm('payment')} className='!w-[180px]' icon={<img
                        className='w-5 h-5'
                        src={PaymentIcon} />
                    } text='Add Payment' bg='primary' />
                </div>
            </div>
        </>
    )
}

export default Addbutton