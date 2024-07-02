import axios, { AxiosInstance } from 'axios';

export default class AuthApiService {
  private static instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  static async postApi<T, R>(url: string, body: T): Promise<R> {
    try {
      const response = await AuthApiService.instance.post<R>(
        url,
        JSON.stringify(body),
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log('Error posting to API:', error);
      throw new Error('Failed to post to API');
    }
  }
}
