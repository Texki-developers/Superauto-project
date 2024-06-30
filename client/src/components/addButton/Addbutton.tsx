import AddIcon from '../../assets/header-icons/add-icon.svg';
import Button from '../button.tsx/Button';
import ReceiptIcon from '../../assets/icons/receipt.png'
import PaymentIcon from '../../assets/icons/payment.png'
import { useState } from 'react';
import PaymentForm from '../paymentFrom.tsx/PaymentForm';
import ReceiptForm from '../receiptForm.tsx copy/ReceiptForm';

const Addbutton = () => {
    const [showAddPaymentModal, setShowPaymentModal] = useState(false)
    const [showAddReceiptModal, setShowReceiptModal] = useState(false)
    return (
        <>
            {
                showAddPaymentModal &&
                <PaymentForm setShow={setShowPaymentModal} />
            }
            {
                showAddReceiptModal &&
                <ReceiptForm setShow={setShowReceiptModal} />
            }
            <div className=" shadow-[0px_0px_5px_#00000044] cursor-pointer group addIcon grid place-items-center absolute w-14 h-14 right-3 bottom-3 rounded-full bg-primary-300">
                <img alt='AddIcon' className='w-5' src={AddIcon} />
                <div className="group-hover:grid hidden absolute bottom-[100%]  right-2 p-2 gap-2 ">
                    <Button onClick={() => setShowReceiptModal(true)} icon={
                        <img className='w-5 h-5' src={ReceiptIcon} />
                    } text='Add Receipt' bg='primary' />
                    <Button onClick={() => setShowPaymentModal(true)} className='!w-[180px]' icon={<img
                        className='w-5 h-5'
                        src={PaymentIcon} />
                    } text='Add Payment' bg='primary' />
                </div>
            </div>
        </>
    )
}

export default Addbutton