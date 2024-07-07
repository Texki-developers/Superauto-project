import { Op } from "sequelize";
import Accounts from "../../../models/accounts";
import Transaction from "../../../models/transaction";

class ReportQueries {


   async createDailybookReport(whereCondition:any){

        const report = await Transaction.findAll({
          where:whereCondition,
            include: [
              {
                model: Accounts,
                as: 'CreditAccount',
                attributes:["name",]
              },
              {
                model: Accounts,
                as: 'DebitAccount',
                attributes:["name",]
              },
            ],
            attributes:["voucher_id","debit_account","credit_account","amount","description"],
            order: [['createdAt', 'ASC']],
          });
      
          return report;
    }

}


export default new  ReportQueries()