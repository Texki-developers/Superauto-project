import React, { SetStateAction, useState } from "react"
import ModalWrapper from "../../../components/modalWrapper"
import AddvehicleForm from "../../../components/vehicles/AddVehicleForm"
import CloseIcon from '../../../assets/icons/close-icon';
import SalesReturnForm from "./SalesReturnForm";
import Tabs from "../../../components/exchangeVehicleComponent/Tabs";


const tabs = ['Sales Return', 'New Vehicle']

interface IProps {
    showPopup: React.Dispatch<SetStateAction<boolean>>;
}
const ExchangeVehicle = ({ showPopup }: IProps) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const onClose = () => {
        showPopup(false)
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
                            <AddvehicleForm onCancelClick={onCancelClick} /> :
                            <SalesReturnForm onCancelClick={onCancelClick} />  // SalesReturnForm component here
                    }

                </div>
            </ModalWrapper>
        </div>
    )
}

export default ExchangeVehicle