/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import { IApiError } from '../types/apimodal/apimodal';

export default class AuthApiService {
  private static instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  static async postApi<T, R>(url: string, body: T): Promise<R | IApiError> {
    try {
      const response = await AuthApiService.instance.post<R>(
        url,
        JSON.stringify(body),
      );
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return {
        message: error?.response?.data?.message ?? 'Something went wrong',
        status: 'error',
      };
    }
  }

  static async postApiFormData<T, R>(
    url: string,
    formData: T,
  ): Promise<R | IApiError> {
    try {
      const response = await AuthApiService.instance.post<R>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error posting to API:', error);
      return {
        message: error?.response?.data?.message ?? 'Something went wrong',
        status: 'error',
      };
    }
  }

  static async getApi<T>(url: string): Promise<T | IApiError> {
    try {
      const response = await AuthApiService.instance.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Error posting to API:', error.message);
      return {
        message: error?.response?.data?.message ?? 'Something went wrong',
        status: 'error',
      };
    }
  }
}
