import { pool } from '../../../config1/dbConfig';
import Accounts from '../../../models/accounts';
import Employee from '../../../models/employee';
import OtherExpense from '../../../models/otherExpense';
import PrimaryLedger from '../../../models/primaryLedger';
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
      const TransactionResult = await Transaction.bulkCreate(data, {returning: true, ...options});
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

  async getVoucher(type: string){
    const result = await Voucher.findOne({where: {voucher_name: type}})
    await Voucher.update({last_invoice_number: (result?.last_invoice_number as number) + 1},{where: {voucher_name: type}})
    
    return {
      prefix: result?.prefix,
      last_invoice_number: result?.last_invoice_number
    };
  }

  async addOtherExpense(data: {
    transaction_id: number;
    amount: number;
    due_date: Date;
  }, options?:any){
    const result = await OtherExpense.create(data, {returning: true, ...options})
    return result
  }
}

export default new AccountQueries();
