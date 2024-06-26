import Button from "../../../components/button.tsx/Button";
import InputBox from "../../../components/formComponents/inputBox/InputBox";
import SelectInput from "../../../components/formComponents/selectInput/SelectInput";
interface IProps {
    onCancelClick: () => void;
}
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const SalesReturnForm = ({ onCancelClick }: IProps) => {
    return (
        <div className="grid gap-3 ">
            <div className="grid grid-cols-2 gap-3 py-6">
                <SelectInput
                    label='Registartion Number'
                    placeholder='Registartion Number'
                    onChange={() => { }}
                    options={options}
                    required
                />
                <InputBox
                    label='Value'
                    placeholder='Value'
                    required
                    onChange={() => { }}
                    type='number'
                />
            </div>
            <div className='button-wrapper flex h-full w-full items-center justify-between'>
                <Button
                    className='bg-gray-300 font-semibold text-black-400'
                    w='100px'
                    text='Reset'
                />
                <div className='save-cancel-btn flex gap-3'>
                    <Button
                        onClick={() => {
                            onCancelClick();
                        }}
                        w='150px'
                        className='bg-failureRed'
                        text='Cancel'
                    />
                    <Button bg='primary' w='150px' text='Save' />
                </div>
            </div>
        </div>
    )
}

export default SalesReturnForm