import authQueries from '../queries/auth.queries';

class authService {
  loginService = (data: any) => {
    return new Promise(async (resolve, reject) => {
      const { category, salary } = data;
      try {
        const accountResult = await authQueries.createAccount(data);

        if (category === 'employee') {
          const account_id = accountResult[0].account_id;
          await authQueries.createEmployee({ account_id, salary });
        }

        return resolve( { message: 'Account created successfully' })
      } catch (error) {
        throw new Error('Account creation failed');
      }
    });
  };
}

export default new authService();
