/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify"

const useToast = () => {
    const toastUpdate = (type: "success" | "error", id: any, message: string) => {
        return toast.update(id, {
            render: message,
            isLoading: false,
            type,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
    const toastLoading = (message: string) => {
        return toast.loading(message)
    }
    const toastSuccess = (id: any, message: string) => {
        return toastUpdate("success", id, message)
    }
    const toastError = (id: any, message: string) => {
        return toastUpdate("error", id, message)
    }
    return {
        toastSuccess,
        toastError,
        toastLoading
    }
}

export default useToast