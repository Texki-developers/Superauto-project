import { IAuthServiceParams } from '../../../types/auth.type';
import { E_ACCOUNT_CATEGORIES, E_PRIMARY_LEDGERS } from '../../../utils/constants/constants';
import authQueries from '../queries/auth.queries';

class authService {
  loginService = (data: IAuthServiceParams) => {
    return new Promise(async (resolve, reject) => {
      const { category, salary } = data;
      try {
        const primaryLedger = E_PRIMARY_LEDGERS[category];
        const headResult = await authQueries.getHead(primaryLedger);
        const accountResult = await authQueries.createAccount({ ...data, head: headResult.pl_id });

        if (category === E_ACCOUNT_CATEGORIES.EMPLOYEE) {
          const account_id = accountResult[0].account_id;
          if (salary) {
            await authQueries.createEmployee({ account_id, salary });
          }
        }
        return resolve({ message: 'Account created successfully' });
      } catch (error) {
        throw new Error('Account creation failed');
      }
    });
  };
}

export default new authService();
