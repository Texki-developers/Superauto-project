import axios from 'axios';

export default class AuthApiService {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8081/api/v1',
      timeout: 10000,
    });
  }

  static async addVehicle(): Promise<any> {
    try {
      const response = await axios.post('/client/vehicle');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
