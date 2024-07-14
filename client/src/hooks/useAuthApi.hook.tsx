import AuthApiService from "../services/api-services"
import useToast from "./useToast.hook"

const useAuthApi = () => {
    const { toastLoading, toastError, toastSuccess } = useToast()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (url: string, body: any, errorMessage: string, successMessage: string, onSuccess?: () => void, onFailure?: () => void) => {
        const id = toastLoading("Please wait...")
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = await AuthApiService.postApi<any, any>(url, body)
            console.log(data)
            if (data?.status === 'error') {
                toastError(id, errorMessage == "" ? data?.data?.message : errorMessage)
                onFailure && onFailure()
                return
            }
            toastSuccess(id, successMessage)
            onSuccess && onSuccess()
        } catch (error) {
            toastError(id, errorMessage)
            onFailure && onFailure()
        }
    }
}

export default useAuthApi