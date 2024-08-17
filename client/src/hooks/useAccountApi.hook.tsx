import AuthApiService from "../services/api-services"
import { IAccountApiBody, IAccountApiBodyResponseBody } from "../types/apimodal/apimodal"
import useToast from "./useToast.hook"
interface IApiParams {
    body: IAccountApiBody;
    errorMessage: string;
    successMessage: string;
    onSuccess?: () => void;
    onFailure?: () => void;
    url?: string | null;
}
const useAccountApi = () => {
    const { toastLoading, toastError, toastSuccess } = useToast()

    return async ({
        body,
        errorMessage,
        successMessage,
        onSuccess,
        onFailure,
        url,
    }: IApiParams) => {
        const id = toastLoading("Please wait...")
        try {
            const data = await AuthApiService.postApi<IAccountApiBody, IAccountApiBodyResponseBody>(url ?? 'accounts/create/account', body)
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