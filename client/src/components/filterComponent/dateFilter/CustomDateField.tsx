import React, { useState } from 'react';


interface IProps {
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

export const DateInput = ({ placeholder, onChange }: IProps) => {
    const [type, setType] = useState('text')


    return (
        <input
            placeholder={placeholder}
            className="textbox-n w-[120px] outline-none border border-gray-400 rounded-md h-[38px] px-2 text-sm"
            type={type}
            onChange={onChange}
            onFocus={() => { setType('date') }}
            onBlur={() => { setType('text') }} />
    );
};