import { toast } from 'react-toastify';
import AuthApiService from './api-services';

export const getData = async (url: string) => {
  try {
    const response: any = await AuthApiService.getApi(url);
    return response.data;
  } catch (error: any) {
    toast.error(error.data?.response.message ?? 'Something went wrong');
  }
};
