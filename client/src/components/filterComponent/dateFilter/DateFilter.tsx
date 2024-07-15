// Path: src/components/filterComponent/dateFilter/DateFilter.tsx

import React from 'react';
import { DateInput } from './CustomDateField';

interface DateFilterProps {
    dateFromProps?: {
        placeholder: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        value: string;
    };
    dateToProps?: {
        placeholder: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        value: string;
    };
}

const DateFilter: React.FC<DateFilterProps> = ({ dateFromProps, dateToProps }) => {
    return (
        <div className="flex gap-2">
            {dateFromProps && <DateInput {...dateFromProps} />}
            {dateToProps && <DateInput {...dateToProps} />}
        </div>
    );
};

export default DateFilter;
