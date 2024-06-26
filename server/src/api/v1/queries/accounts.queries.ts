import { pool } from "../../../config1/dbConfig";
import Accounts from "../../../models/accounts";
import PrimaryLedger from "../../../models/primaryLedger";
import Transaction from "../../../models/transaction";
import { ITransactionParams } from "../../../types/db.type";

class AccountQueries {
    async createAccount(body: { name: string, contact_info: string, category: string, head: number }) {
        const query = `INSERT INTO account (name, contact_info, category, head) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [body.name, body.contact_info, body.category, body.head];
        return await  pool.query(query, values);
    }
    
    
    async createEmployee(body: { account_id: number, salary: number }) {
        const query = `INSERT INTO employee (account_id, salary) VALUES ($1, $2) RETURNING *`;
        const values = [body.account_id, body.salary];
        return await  pool.query(query, values);
    }

    async getHead(primaryLedger: string) {
        try {
          const ledger = await PrimaryLedger.findOne({
            where: {
              ledger_name: primaryLedger
            }
          });
          return ledger;
        } catch (error) {
          console.error('Error fetching ledger:', error);
        }
      }

      async generateTransaction (data:ITransactionParams[],options?:any){
            try{
              const TransactionResult  = await Transaction.bulkCreate(data,options)
              return TransactionResult
            }catch(error){
              throw new Error('Failed To Generate Transaction')
            }
      }


      async findAccount (name:string) {
        const result =  await Accounts.findOne({ where: { name:name } })

        return result?.account_id
      }
      
}

export default new AccountQueries();
