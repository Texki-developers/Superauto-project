import { toast } from "react-toastify"
import AuthApiService from "../services/api-services"
const useGetApis = () => {
  const callApi = async (url: string) => {
    try {
      const response: any = await AuthApiService.getApi(url)
      console.log(response.data)
      return response.data
    } catch (error: any) {
      toast.error(error.data?.response.message ?? 'Something went wrong')
    }
  }
  return { callApi }

}
export default useGetApis