import './style.scss'

const BalanceSheetTable = () => {
    return (
        <div className="w-full border-2 border-gray-300 h-full rounded-lg bg-white-100 grid grid-rows-[80px_1fr_80px]">
            <header className="border-b-2 border-gray-300 grid grid-cols-2">
                <div className="border-r-2 border-gray-300 grid place-items-center">
                    <h3 className="text-lg font-bold">Assets</h3>
                </div>
                <div className="border-r-2 border-gray-300 grid place-items-center">
                    <h3 className="text-lg font-bold">LIABILITIES & EQUITY</h3>
                </div>
            </header>
            <main className="grid grid-cols-2 border-gray-300">
                <aside className="border-r-2 border-gray-300">
                    <div>
                        <div className="title">
                            <h4  >Current Assets</h4>
                        </div>
                        <Items amountColor='text-black-300' keyItem='Cash In Hand' value='1000' type='first-level' />
                        <Items amountColor='text-primary-300' keyItem='Cash In Hand' value='1000' type='second-level' />
                        <Items amountColor='text-failureRed' keyItem='Cash In Hand' value='-1000' type='first-level' />
                        <div className="total">
                            <h4 className="text-md font-semibold">Total Current Assets</h4>
                            <h4 className="text-md font-semibold">₹40000</h4>
                        </div>
                    </div>
                    <div>
                        <div className="title">
                            <h4  >Current Assets</h4>
                        </div>
                        <Items amountColor='text-black-300' keyItem='Cash In Hand' value='1000' type='first-level' />
                        <Items amountColor='text-primary-300' keyItem='Cash In Hand' value='1000' type='first-level' />
                        <Items amountColor='text-failureRed' keyItem='Cash In Hand' value='-1000' type='second-level' />
                        <div className="total">
                            <h4 className="text-md font-semibold">Total Current Assets</h4>
                            <h4 className="text-md font-semibold">₹40000</h4>
                        </div>
                    </div>
                </aside>
                <aside className="border-r-2 border-gray-300">
                    <div>
                        <div className="title">
                            <h4  >Current Assets</h4>
                        </div>
                        <Items amountColor='text-black-300' keyItem='Cash In Hand' value='1000' type='first-level' />
                        <Items amountColor='text-primary-300' keyItem='Cash In Hand' value='1000' type='second-level' />
                        <Items amountColor='text-primary-300' keyItem='Cash In Hand' value='1000' type='second-level' />
                        <Items amountColor='text-failureRed' keyItem='Cash In Hand' value='-1000' type='second-level' />
                        <div className="total">
                            <h4 className="text-md font-semibold">Total Current Assets</h4>
                            <h4 className="text-md font-semibold">₹40000</h4>
                        </div>
                    </div>
                </aside>
            </main>
            <footer className="text-md  grid grid-cols-2 border-t-2 border-gray-300">
                <div className=" px-3 flex items-center justify-between border-r-2 border-gray-300">
                    <h4 className="text-md font-semibold">TOTAL ASSETS</h4>
                    <h4 className="text-md font-semibold">₹40000</h4>
                </div>
                <div className="px-3  flex items-center justify-between ">
                    <h4 className="text-md font-semibold">TOTAL LIABIILITIES & EQUITY</h4>
                    <h4 className="text-md font-semibold">₹40000</h4>
                </div>
            </footer>
        </div>
    )
}

export default BalanceSheetTable

interface IItems {
    type: string;
    value: string;
    keyItem: string;
    amountColor: string;
}
const Items = ({ type, value, keyItem, amountColor }: IItems) => {
    return (
        <div className={type ?? 'first-level'}>
            <p className='item font-semibold'>{keyItem}</p>
            <p className={`${amountColor} font-semibold`}>{value}</p>
        </div>
    )
}