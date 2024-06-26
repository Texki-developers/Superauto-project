import React, { SetStateAction } from 'react'

interface IProps {
    setSelectedTab: React.Dispatch<SetStateAction<number>>;
    selectedTab: number;
    tabs: string[];
}

const Tabs = ({ setSelectedTab, selectedTab, tabs }: IProps) => {
    return (
        <div style={{ cursor: 'pointer' }} className="flex gap-3 ">
            {
                tabs?.map((tab, index) => (
                    <div onClick={() => {
                        setSelectedTab(index)
                    }} key={index} className={`text-[18px] font-semibold text-black-300 ${index === selectedTab ? 'text-primary-300 border-b-2 border-primary-300' : ''} `}>{tab}</div>
                ))
            }
        </div>
    )
}

export default Tabs