import { Sequelize, Transaction } from 'sequelize';
import { IAccountAttributes, IEmployeeAttributes } from '../../../types/db.type';
import { IAccountBody, IOtherExpenseBody, IPaymentBody, IRecieptBody } from '../../../types/request.type';
import { E_ACCOUNT_CATEGORIES, E_LEDGERS_BASIC, E_PRIMARY_LEDGERS } from '../../../utils/constants/constants';
import accountsQueries from '../queries/accounts.queries';
import authQueries from '../queries/accounts.queries';
import { db } from '../../../config/database';
import { performTransaction } from '../../../utils/PerformTransaction/PerformTransaction';
import getVoucher from '../../../utils/getVoucher/getVoucher';
import { Op } from 'sequelize';

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
      } catch (error: any) {
        console.log(error, 'THE ERROR');
        reject({ message: error.message });
      }
    });
  };

  bookOtherExpense = (data: IOtherExpenseBody) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dbTransaction: Transaction = await db.transaction();
        const expenseAcResult: any = await accountsQueries.findAccount(E_LEDGERS_BASIC.OTHER_EXPENSE);
        const voucher: string = await getVoucher('Expense');

        console.log(expenseAcResult, 'this is expense ac');

        const transactionResult = await accountsQueries.generateTransaction(
          [
            {
              amount: data?.amount,
              credit_account: data.expense_to,
              debit_account: expenseAcResult,
              description: data.description,
              voucher_id: voucher,
            },
          ],
          { transaction: dbTransaction }
        );

        await accountsQueries.addOtherExpense(
          {
            transaction_id: transactionResult[0]?.transaction_id,
            amount: data.amount,
            due_date: data?.date,
          },
          { transaction: dbTransaction }
        );

        await performTransaction(dbTransaction);
        resolve('Updated successully');
      } catch (error: any) {
        console.error(error.message);
        reject(error);
      }
    });
  };

  addReciept = (data: IRecieptBody) => {
    return new Promise(async (resolve, reject) => {
      try {
        const creditAc: any = await accountsQueries.findAccount(E_LEDGERS_BASIC[data.payment_to]);
        const voucher: string = await getVoucher('Reciept');

        await accountsQueries.generateTransaction([
          {
            amount: data?.amount,
            credit_account: creditAc,
            debit_account: data.payment_from,
            description: data.description,
            voucher_id: voucher,
          },
        ]);
        resolve('Updated successully');
      } catch (error: any) {
        console.error(error.message);
        reject(error);
      }
    });
  };

  addPayment = (data: IPaymentBody) => {
    return new Promise(async (resolve, reject) => {
      try {
        const debitAc: any = await accountsQueries.findAccount(E_LEDGERS_BASIC[data.payment_from]);
        const voucher: string = await getVoucher('Payments');

        await accountsQueries.generateTransaction([
          {
            amount: data?.amount,
            credit_account: data.payment_to,
            debit_account: debitAc,
            description: data.description,
            voucher_id: voucher,
          },
        ]);
        resolve('Updated successully');
      } catch (error: any) {
        console.error(error.message);
        reject(error);
      }
    });
  };

  async getbyCategory(data: string, page = 1, perPage = 10) {
    return new Promise(async (resolve, reject) => {
      try {
        let option: any;
        if (data === E_ACCOUNT_CATEGORIES.BROKER || data === 'CUSTOMER') {
          option = {
            where: {
              category: {
                [Op.or]: [E_ACCOUNT_CATEGORIES.BROKER, 'CUSTOMER'],
              },
            },
            limit: perPage,
            offset: (page - 1) * perPage,
          };
        } else {
          option = {
            where: {
              category: {
                [Op.eq]: data.trim(),
              },
            },
            limit: perPage,
            offset: (page - 1) * perPage,
          };
        }

        const categoryResult = await accountsQueries.findAccountsByCategory(option);
        return resolve(categoryResult);
      } catch (err) {
        console.error(err);
        reject({ message: `Failed to list ${data}: ${err}` });
      }
    });
  }

  getFinancerDetails(data: number) {
    return new Promise(async (resolve, reject) => {
      try {
        let option = {
          where: {
            account_id: data,
            category: 'FINANCER',
          },
        };

        const getFinanceResult = await accountsQueries.getAccountsByid(option);
        return resolve(getFinanceResult);
      } catch (err) {
        console.log(err);
        reject({ message: `Failed to List Financers..: ${err}` });
      }
    });
  }

  getCategorySearch(search: string, category: string) {
    console.log(search,category,"QUERY AP")
    return new Promise(async (resolve, reject) => {
      try {
        let whereCondition: any = {};
        if (category === E_ACCOUNT_CATEGORIES.BROKER || category === 'CUSTOMER') {
          whereCondition.category = {
            [Op.or]: [E_ACCOUNT_CATEGORIES.BROKER, 'CUSTOMER'],
          };
        } else {
          whereCondition.category = {
            [Op.eq]: category.trim(),
          };
        }

        if (search.trim() !== '') {
          whereCondition[Op.or] = [
            { name: { [Op.iLike]: `%${search}%` } },
            { contact_info: { [Op.iLike]: `%${search}%` } },
            Sequelize.literal(`to_char("createdAt", 'YYYY-MM-DD HH24:MI:SS') ILIKE '%${search}%'`),
          ];
        }
 

       const result =  await accountsQueries.SearchCategory(whereCondition)

       return resolve (result)
      } catch (err) {
        console.log(err);
        reject({ message: `Failed to List Financers..: ${err}` });
      }
    });
  }
}

export default new AccountService();
