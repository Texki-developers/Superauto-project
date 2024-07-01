import { IAccountAttributes, IEmployeeAttributes } from '../../../types/db.type';
import { IAccountBody, IOtherExpenseBody } from '../../../types/request.type';
import { E_ACCOUNT_CATEGORIES, E_LEDGERS_BASIC, E_PRIMARY_LEDGERS } from '../../../utils/constants/constants';
import accountsQueries from '../queries/accounts.queries';
import authQueries from '../queries/accounts.queries';

class AccountService {
  createAccount = (data: IAccountBody) => {
    return new Promise(async (resolve, reject) => {
      const { category, salary }: { category: E_ACCOUNT_CATEGORIES; salary: number } = data;
      try {
        const primaryLedger = E_PRIMARY_LEDGERS[category];

        if (primaryLedger) {
          const accountResult = await authQueries.createAccount({ ...data, head: primaryLedger });
      
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

  bookOtherExpense = (data: IOtherExpenseBody) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expenseAcResult: any = await accountsQueries.findAccount(E_LEDGERS_BASIC.OTHER_EXPENSE);

        // await accountsQueries.generateTransaction(
        //   [
        //     {
        //       amount: data?.amount,
        //       credit_account: data.expense_to,
        //       debit_account: expenseAcResult?.[0]?.account_id,
        //       description: data.description
        //     },
        //   ],
        //   { transaction }
        // );
      } catch (error) {
        console.error(error);
        throw new Error('Adding expense failed!');
      }
    });
  };
}

export default new AccountService();
