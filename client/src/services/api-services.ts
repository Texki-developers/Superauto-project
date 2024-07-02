import axios, { AxiosInstance } from 'axios';

export default class AuthApiService {
  private static instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  static async postApi<T, R>(url: string, body: T): Promise<R | null> {
    try {
      const response = await AuthApiService.instance.post<R>(
        url,
        JSON.stringify(body),
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log('Error posting to API:', error);
      return null;
    }
  }

  static async postApiFormData<R>(
    url: string,
    formData: FormData,
  ): Promise<R | null> {
    try {
      const response = await AuthApiService.instance.post<R>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error posting to API:', error);
      return null;
    }
  }
}
