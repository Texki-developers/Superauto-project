import { IAccountAttributes, IEmployeeAttributes } from '../../../types/db.type';
import { IAccountBody } from '../../../types/request.type';
import { E_ACCOUNT_CATEGORIES, E_PRIMARY_LEDGERS } from '../../../utils/constants/constants';
import authQueries from '../queries/accounts.queries';

class AccountService {
  createAccount = (data:IAccountBody ) => {
    return new Promise(async (resolve, reject) => {
      const { category, salary } = data;
      try {
        const primaryLedger = E_PRIMARY_LEDGERS[category];
        const headResult = await authQueries.getHead(primaryLedger);
        if(headResult?.pl_id){
          const accountResult = await authQueries.createAccount({ ...data, head: headResult?.pl_id  });
          if (category === E_ACCOUNT_CATEGORIES.EMPLOYEE) {
            const account_id = accountResult[0].account_id;
            if (salary) {
              await authQueries.createEmployee({ account_id, salary });
            }
          }
          return resolve({ message: 'Account created successfully' });
        }
            throw new Error('Head is not Found!');
      } catch (error) {
        throw new Error('Account creation failed');
      }
    });
  };
}

export default new AccountService();
