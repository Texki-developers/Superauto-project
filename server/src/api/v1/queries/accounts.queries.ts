import { Op, where } from 'sequelize';
import { pool } from '../../../config1/dbConfig';
import Accounts from '../../../models/accounts';
import Employee from '../../../models/employee';
import OtherExpense from '../../../models/otherExpense';
import Payment from '../../../models/payments';
import PrimaryLedger from '../../../models/primaryLedger';
import Receipt from '../../../models/receipents';
import Transaction from '../../../models/transaction';
import Voucher from '../../../models/vouchers';
import { ITransactionParams } from '../../../types/db.type';
import returnDataValues from '../../../utils/commonUtils/returnDataValues';
import { E_ACCOUNT_CATEGORIES } from '../../../utils/constants/constants';

class AccountQueries {
  async createAccount(body: { name: string; contact_info: string; category: E_ACCOUNT_CATEGORIES; head: number }) {
    return await Accounts.create(body);
  }

  async createEmployee(body: { account_id: number; salary: number }) {
    return await Employee.create(body);
  }

  async getHead(primaryLedger: string) {
    try {
      const ledger = await PrimaryLedger.findOne({
        where: {
          ledger_name: primaryLedger,
        },
      });
      return ledger;
    } catch (error) {
      console.error('Error fetching ledger:', error);
    }
  }

  async generateTransaction(data: ITransactionParams[], options?: any) {
    try {
      console.log(data, 'TRAN');
      const TransactionResult = await Transaction.bulkCreate(data, { returning: true, ...options });
      return returnDataValues(TransactionResult);
    } catch (error) {
      console.log(error);

      throw new Error('Failed To Generate Transaction');
    }
  }

  async findAccount(name: string) {
    const result = await Accounts.findOne({ where: { name: name } });
    return result?.account_id;
  }

  async getVoucher(type: string) {
    const result = await Voucher.findOne({ where: { voucher_name: type } });
    await Voucher.update(
      { last_invoice_number: (result?.last_invoice_number as number) + 1 },
      { where: { voucher_name: type } }
    );

    return {
      prefix: result?.prefix,
      last_invoice_number: result?.last_invoice_number,
    };
  }

  async addOtherExpense(
    data: {
      transaction_id: number;
      amount: number;
      due_date: Date;
    },
    options?: any
  ) {
    const result = await OtherExpense.create(data, { returning: true, ...options });
    return result;
  }

  // async addPaymadentData(data: {date: Date, transaction_id: number, description: string}, options?:any){
  //   const result = await Payment.create(data,{returning: true, ...options})
  //   return result;
  // }

  async addRecieptData(data: { date: Date; transaction_id: number; description: string }, options?: any) {
    const result = await Receipt.create(data, { returning: true, ...options });
    return result;
  }

  async findAccountsByCategory(category: any) {
    const { rows: accounts, count: totalCount } = await Accounts.findAndCountAll({
       ...category,
      include: [
        {
          model: Employee,
          required: false,
          attributes: ['salary'],
        },
      ],
      attributes: ['account_id', 'name', 'contact_info', 'category'],
    });

    const result = {
      accounts: accounts,
      totalCount: totalCount,
      currentLength: accounts.length,
    };

    return result
  }

  async getAccountsByid(option:any){
    const result = await Accounts.findAll({
      where:option.where,
      attributes: ['account_id', 'name', 'contact_info', 'category'],
    });

    return result;
  }


  async SearchCategory(whereCondition:any){
      console.log(whereCondition,"where condition")
    const accounts = await Accounts.findAll({
      where: whereCondition,
      attributes: ['account_id', 'name', 'contact_info','category'], 
    });
    return accounts
  }


}

export default new AccountQueries();
