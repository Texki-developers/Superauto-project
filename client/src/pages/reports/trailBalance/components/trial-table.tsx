import './style.scss'

interface IProps {
    data: any
}
const TrialTable = ({ data }: IProps) => {
    console.log(data)
    return (
        <div className="w-full h-full bg-white-100  rounded-lg grid grid-rows-[1fr_50px]">
            <div className="table-container">
                <div className='border-b-2 border-gray-200 p-4'>
                    <ul className="table-head-tr bg-white-100">
                        <li>Accounts</li>
                        <li>Debit (₹)</li>
                        <li>Credit (₹)</li>
                    </ul>
                </div>
                <div className='grid gap-[5px]'>
                    <ul className="table-tr">
                        <li>Capital Account</li>
                        <li>1000</li>
                        <li>100</li>
                    </ul>
                    <ul className="child-tr">
                        <li>
                            Capital Account
                        </li>
                        <li>1000</li>
                        <li>100</li>
                    </ul>
                    <ul className="child-tr">
                        <li>
                            Capital Account
                        </li>
                        <li>1000</li>
                        <li>100</li>
                    </ul>
                    <ul className="child-tr">
                        <li>
                            Capital Account
                        </li>
                        <li>1000</li>
                        <li>100</li>
                    </ul>
                    <ul className="table-tr">
                        <li>Capital Account</li>
                        <li>1000</li>
                        <li>100</li>
                    </ul>
                    <ul className="table-tr">
                        <li>Capital Account</li>
                        <li>1000</li>
                        <li>100</li>
                    </ul>
                </div>
            </div>
            <footer className='border-t border-gray-200 grid items-center px-4'>
                <ul className="table-head-tr bg-white-100">
                    <li>Total</li>
                    <li>1000</li>
                    <li>200</li>
                </ul>
            </footer>
        </div>
    )
}

export default TrialTable