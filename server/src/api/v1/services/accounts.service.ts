import { IAccountAttributes, IEmployeeAttributes } from '../../../types/db.type';
import { IAccountBody } from '../../../types/request.type';
import { E_ACCOUNT_CATEGORIES, E_PRIMARY_LEDGERS } from '../../../utils/constants/constants';
import authQueries from '../queries/accounts.queries';

class AccountService {
  createAccount = (data: IAccountBody) => {
    return new Promise(async (resolve, reject) => {
      const { category, salary }: { category: E_ACCOUNT_CATEGORIES; salary: number } = data;
      try {
        const primaryLedger = E_PRIMARY_LEDGERS[category];

        if (primaryLedger) {
          const accountResult = await authQueries.createAccount({ ...data, head: primaryLedger });
          console.log(accountResult, 'RESULT >>>>>>');

          if (category === E_ACCOUNT_CATEGORIES.EMPLOYEE) {
            const account_id = accountResult?.account_id;
            console.log(account_id, 'ACcount id');
            if (salary) {
              await authQueries.createEmployee({ account_id, salary });
            }
          }
          return resolve({ message: 'Account created successfully' });
        }
        throw new Error('Head is not Found!');
      } catch (error) {
        console.log(error, 'THE ERROR');
        throw new Error('Account creation failed');
      }
    });
  };
}

export default new AccountService();
