import { db } from '../../../config/database';
import { Users } from '../../../models/users';

class AuthService {
  createUser({username, password, email}:{username:string, password:string, email:string}) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await Users.create({
          user_name: username,
          password: password,
          email:email
        });
        resolve(user);
      } catch (err) {
        reject({ message: `Failed to create user: ${err}` });
      }
    });
  }
}

export default new AuthService();
