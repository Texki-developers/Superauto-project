import { IFormatedData } from '../../../../types/trialBalance/trialBalance'
import './style.scss'
import { v4 as uuidv4 } from 'uuid';

interface IProps {
    data: IFormatedData | null;
    total: {
        debit: number,
        credit: number,
    }
}
const TrialTable = ({ data, total }: IProps) => {
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
                        <li>0</li>
                        <li>0</li>
                    </ul>
                    {data?.asset &&
                        <>
                            <ul className="table-tr">
                                <li>Current Assets</li>
                                <li>{data?.asset?.total_debit}</li>
                                <li>{data?.asset?.total_credit}</li>
                            </ul>
                            {
                                data?.asset?.children?.map((item) => (
                                    <ul key={uuidv4()} className="child-tr">
                                        <li>{item?.ledger}</li>
                                        <li>{item?.total_debit}</li>
                                        <li>{item?.total_credit}</li>
                                    </ul>
                                ))
                            }
                        </>
                    }
                    {data?.liability &&
                        <>
                            <ul className="table-tr">
                                <li>Current Liabilities</li>
                                <li>{data?.liability?.total_debit}</li>
                                <li>{data?.liability?.total_credit}</li>
                            </ul>
                            {
                                data?.liability?.children?.map((item) => (
                                    <ul key={uuidv4()} className="child-tr">
                                        <li>{item?.ledger}</li>
                                        <li>{item?.total_debit}</li>
                                        <li>{item?.total_credit}</li>
                                    </ul>
                                ))
                            }
                        </>
                    }
                    {
                        data?.Purchase &&
                        <>
                            <ul className="table-tr">
                                <li>Purchase</li>
                                <li>{data?.Purchase?.total_debit}</li>
                                <li>{data?.Purchase?.total_credit}</li>
                            </ul>
                            <ul className="child-tr">
                                <li>{data?.Purchase?.ledger}</li>
                                <li>{data?.Purchase?.total_debit}</li>
                                <li>{data?.Purchase?.total_credit}</li>
                            </ul>
                        </>
                    }
                    {
                        data?.Sales &&
                        <>
                            <ul className="table-tr">
                                <li>Sales</li>
                                <li>{data?.Sales?.total_debit}</li>
                                <li>{data?.Sales?.total_credit}</li>
                            </ul>
                            <ul className="child-tr">
                                <li>{data?.Sales?.ledger}</li>
                                <li>{data?.Sales?.total_debit}</li>
                                <li>{data?.Sales?.total_credit}</li>
                            </ul>
                        </>
                    }
                </div>
            </div>
            <footer className='border-t border-gray-200 grid items-center px-4'>
                <ul className="table-head-tr bg-white-100">
                    <li>Total</li>
                    <li>{total?.debit}</li>
                    <li>{total?.credit}</li>
                </ul>
            </footer>
        </div>
    )
}

export default TrialTable