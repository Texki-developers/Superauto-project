import { toast } from "react-toastify"
import AuthApiService from "../services/api-services"
const useGetApis = () => {
  const callApi = async (url: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response:any = await AuthApiService.getApi(url)
      return response
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data?.response.message ?? 'Something went wrong')
    }
  }
  return { callApi }

}
export default useGetApis