import { useForm } from "react-hook-form"
import Button from "../button.tsx/Button"
import InputBox from "../formComponents/inputBox/InputBox"
import ModalWrapper from "../modalWrapper"
import AuthApiService from "../../services/api-services";
import useToast from "../../hooks/useToast.hook";

interface IProps {
    category: string;
    label: string;
    verifyText: string;
    apiUrl: string;
    onClose: () => void;
    refetch: () => void;
}

const DeleteModal = (props: IProps) => {
    const { register, formState: { errors, isValid } } = useForm({
        defaultValues: {
            confirmDelete: ''
        }
    })
    const inputValidation = (value: string | number | undefined): boolean => {
        return value === props?.verifyText
    }
    const toast = useToast()
    const onDelete = async () => {
        const id = toast.toastLoading("Loading...")
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const resposne = await AuthApiService?.deleteApi<null, any>(props?.apiUrl, null)
            if (resposne?.statusCode === 200 && resposne.status !== 'error') {
                toast.toastSuccess(id, resposne?.message || resposne?.data?.message || "Deleted successfully")
                props?.onClose()
                props?.refetch()
            } else {
                toast.toastError(id, resposne?.message || resposne?.data?.message || "Failed to delete")
                props?.onClose()
            }
        } catch (error) {
            toast.toastError(id, "Something went wrong")
        }

    }
    return (
        <ModalWrapper title={`Delete ${props?.category}`} onClose={props?.onClose}>
            <div className="grid h-full grid-rows-[auto_1fr_40px] gap-3">
                <h2 className="text-sm max-w-[400px] font-semibold text-failureRed ">Please note that this item cannot be recovered once deleted. Are you sure you want to delete?</h2>
                <div>
                    <InputBox validation={inputValidation} placeholder={props?.verifyText} label={props?.label} name="confirmDelete" error={errors} register={register} />
                </div>
                <div className="flex justify-end">
                    <div className="flex gap-2">
                        <Button className="bg-gray-300 text-black-400" text="Cancel" onClick={props?.onClose} />
                        <Button disabled={!isValid} className="bg-failureRed" text="Delete" onClick={onDelete} />
                    </div>
                </div>
            </div>
        </ModalWrapper>
    )
}

export default DeleteModal