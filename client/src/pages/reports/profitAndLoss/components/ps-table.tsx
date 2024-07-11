import './style.scss'

interface IProps {
    data: {
        [key: string]: {
            total: number,
            account_id: string,
        }
    }
}
const BalanceSheetTable = ({ data }: IProps) => {
    console.log(data)
    return (
        <div className="w-full border-2 border-gray-300 h-full rounded-lg bg-white-100 grid grid-rows-[40px_1fr_80px]">
            <header className="bb-2 grid grid-cols-2">
                <div className="br-2 grid place-items-center">
                    <h3 className="text-lg font-bold">Dr</h3>
                </div>
                <div className=" grid place-items-center">
                    <h3 className="text-lg font-bold">Cr</h3>
                </div>
            </header>
            <main className="grid grid-cols-2 border-gray-300">
                <aside className=" br-2 grid grid-cols-[1fr_120px] font-semibold text-md">
                    <section>
                        <div className="w-full">
                            <header className='p-3 bb-2 font-semibold text-lg'>
                                <h3>Particulars</h3>
                            </header>
                            <div className='p-3 h-[200px]'>
                                <p className='py-1'>To Purchase</p>
                                <p className='py-1'>To Opening Inventory</p>
                                <p className='py-1'>To Other Direct Expense</p>
                                <p className='py-1'>To Gross Profit c/d</p>
                            </div>
                            <div className='px-3 mt-7 h-[100px]'>
                                <p className='py-1'>To Gross Loss</p>
                                <p className='py-1'>To Salaries</p>

                            </div>
                        </div>
                    </section>
                    <section className='bl-2'>
                        <div className="w-full">
                            <header className='p-3 bb-2 font-semibold text-lg'>
                                <h3>Amount</h3>
                            </header>
                            <div className='p-3 bb-2 h-[200px]'>
                                <p className="py-1">{data?.["to_purchase"]?.total ?? "--"}</p>
                                <p className="py-1">{data?.["to_opening_inventory"]?.total ?? "--"}</p>
                                <p className="py-1">{data?.["to_other_direct_expense"]?.total ?? "--"}</p>
                                <p className="py-1">{data?.["to_gross_profit_c/d"]?.total ?? "--"}</p>
                            </div>
                            <div className='px-3 mt-7 bt-2 h-[100px]'>
                                <p className="py-1">{data?.["to_gross_loss"]?.total ?? "--"}</p>
                                <p className="py-1">{data?.["to_salaries"]?.total ?? "--"}</p>
                            </div>
                        </div>
                    </section>
                </aside>
                <aside className=" grid grid-cols-[1fr_120px] font-semibold text-md">
                    <section>
                        <div className="w-full ">
                            <header className='p-3 bb-2 font-semibold text-lg'>
                                <h3>Particulars</h3>
                            </header>
                            <div className='p-3 h-[200px]'>
                                <p className='py-1'>By Sales</p>
                                <p className='py-1'>By Closing Inventory</p>
                                <p className='py-1'>By Gross Loss</p>
                                <p className='py-1'></p>
                            </div>
                            <div className='px-3 mt-7 h-[100px]'>
                                <p className='py-1'>By Gross Profit</p>

                            </div>
                        </div>
                    </section>
                    <section className='bl-2'>
                        <div className="w-full">
                            <header className='p-3 bb-2 font-semibold text-lg'>
                                <h3>Amount</h3>
                            </header>
                            <div className='p-3 bb-2 h-[200px]'>
                                <p className="py-1">{data?.["by_sales"]?.total ?? "--"}</p>
                                <p className="py-1">{data?.["by_closing_inventory"]?.total ?? "--"}</p>
                                <p className="py-1">{data?.["by_gross_loss"]?.total ?? "--"}</p>
                            </div>
                            <div className='px-3 mt-7 bt-2 h-[100px]'>
                                <p className="py-1">{data?.["by_gross_profit"]?.total ?? "--"}</p>
                            </div>
                        </div>
                    </section>
                </aside>
            </main>
            <footer className="text-md  grid grid-cols-2 bt-2">
                <div className=" grid grid-cols-[1fr_120px] items-center justify-between border-r-2 border-gray-300">
                    <h4 className=" px-3 text-md font-semibold text-lg">By Net loss</h4>
                    <div className="bl-2 h-full grid place-items-center">
                        <h4 className="text-md font-semibold text-lg">₹{data?.["by_net_loss"]?.total}</h4>
                    </div>
                </div>
                <div className=" items-center justify-between grid grid-cols-[1fr_120px]">
                    <h4 className="px-3 text-md font-semibold text-lg">By Net Loss</h4>
                    <div className="bl-2 h-full grid place-items-center ">
                        <h4 className="text-md font-semibold text-lg">₹{data?.["by_net_loss"]?.total}</h4>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default BalanceSheetTable
