import AuthApiService from "../services/api-services"
import { IAccountApiBody, IAccountApiBodyResponseBody } from "../types/apimodal/apimodal"
import useToast from "./useToast.hook"

const useAccountApi = () => {
    const { toastLoading, toastError, toastSuccess } = useToast()

    return async (body: IAccountApiBody, errorMessage: string, successMessage: string, onSuccess?: () => void, onFailure?: () => void) => {
        const id = toastLoading("Please wait...")
        console.log(id)
        try {
            const data = await AuthApiService.postApi<IAccountApiBody, IAccountApiBodyResponseBody>('accounts/create/account', body)
            console.log(data)
            if (data?.status === 'error') {
                toastError(id, errorMessage)
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

export default useAccountApi