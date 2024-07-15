import { IFormattedBalanceSheet } from '../../../../types/balanceSheet/balanceSheet'
import './style.scss'
import { v4 as uuidv4 } from 'uuid';

interface IProps {
    data: IFormattedBalanceSheet | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const keys: any = {
    'Cash': 'Cash In Hand',
    'Bank': 'Bank Accounts',
    'Purchase': 'Inventory',
    'Capital A/C': 'Capital Stock',
}
const BalanceSheetTable = ({ data }: IProps) => {
    return (
        <div className="w-full border-2 border-gray-300 h-full rounded-lg bg-white-100 grid grid-rows-[80px_1fr_40px_80px]">
            <header className="border-b-2 border-gray-300 grid grid-cols-2">
                <div className="border-r-2 border-gray-300 grid place-items-center">
                    <h3 className="text-lg font-bold">Assets</h3>
                </div>
                <div className=" grid place-items-center">
                    <h3 className="text-lg font-bold">LIABILITIES & EQUITY</h3>
                </div>
            </header>
            <main className="grid grid-cols-2 border-gray-300">
                <aside className="border-r-2 border-gray-300">
                    <div>
                        <div className="title">
                            <h4>Current Assets</h4>
                        </div>
                        {
                            data?.asset?.children?.map((item) => (
                                <Items type='first-level' value={item?.balance} key={uuidv4()} keyItem={keys[item?.ledger] ?? item?.ledger} />
                            ))
                        }
                        <div className="total">
                            <h4 className="text-md font-semibold">Total Current Assets</h4>
                            <h4 className="text-md font-semibold">₹{data?.asset?.balance}</h4>
                        </div>
                    </div>

                </aside>
                <aside>
                    <div>
                        <div className="title">
                            <h4 >Capital Accounts</h4>
                        </div>
                        <Items type='first-level' value={data?.capitalAc?.balance ?? 0} key={uuidv4()} keyItem={'Capital Account'} />
                        <div className="total">
                            <h4 className="text-md font-semibold">Total Capital Accounts</h4>
                            <h4 className="text-md font-semibold">₹{data?.capitalAc?.balance ?? 0}</h4>
                        </div>
                    </div>
                    <div>
                        <div className="title">
                            <h4  >Current Liabilities</h4>
                        </div>
                        {
                            data?.liability?.children?.map((item) => (
                                <Items type='first-level' value={item?.balance} key={uuidv4()} keyItem={keys[item?.ledger] ?? item?.ledger} />
                            ))
                        }
                        <div className="total">
                            <h4 className="text-md font-semibold">Total Current Liabilities</h4>
                            <h4 className="text-md font-semibold">₹{data?.liability?.balance}</h4>
                        </div>
                    </div>
                    {/* <div>
                        <div className="title">
                            <h4>Shareholder’s Equity</h4>
                        </div>
                        {
                            data?.equity?.children?.map((item) => (
                                <Items type='first-level' value={item?.balance} key={uuidv4()} keyItem={keys[item?.ledger] ?? item?.ledger} />
                            ))
                        }
                        <div className="total">
                            <h4 className="text-md font-semibold">Total shareholder’s Equity</h4>
                            <h4 className="text-md font-semibold">₹{data?.equity?.balance}</h4>
                        </div>
                    </div> */}
                </aside>
            </main>
            <div className='grid grid-cols-2'>
                <div className='border-r-2 border-gray-300'></div>
                <div className="items-center flex justify-between w-full h-full px-3 bt-2" >
                    <h4 className="text-md font-semibold">Total Profits</h4>
                    <h4 className="text-md font-semibold">₹{data?.total_profit?.balance}</h4>
                </div>
            </div>
            <footer className="text-md  grid grid-cols-2 border-t-2 border-gray-300">
                <div className="  px-3 flex items-center justify-between border-r-2 border-gray-300">
                    <h4 className="pl-4 text-md font-semibold">Total Profits</h4>
                    <h4 className="text-md font-semibold">₹--</h4>
                </div>
                <div className="px-3  flex items-center justify-between ">
                    <h4 className="text-md font-semibold">TOTAL LIABIILITIES & EQUITY</h4>
                    <h4 className="text-md font-semibold">₹{Number(data?.liability?.balance ?? 0) + Number(data?.capitalAc?.balance ?? 0) + Number(data?.total_profit?.balance ?? 0)} </h4>
                </div>
            </footer>
        </div>
    )
}

export default BalanceSheetTable

interface IItems {
    type: 'first-level' | 'second-level';
    value: string | number;
    keyItem: string;
    amountColor?: string;
}
const Items = ({ type, value, keyItem, amountColor }: IItems) => {
    return (
        <div className={type ?? 'first-level'}>
            <p className='item font-semibold'>{keyItem}</p>
            <p className={`${amountColor} font-semibold`}>{value}</p>
        </div>
    )
}