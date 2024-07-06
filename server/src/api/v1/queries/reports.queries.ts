import Accounts from "../../../models/accounts";
import Transaction from "../../../models/transaction";

class ReportQueries {


   async createDailybookReport(){

        const report = await Transaction.findAll({
            include: [
              {
                model: Accounts,
                as: 'CreditAccount',
              },
              {
                model: Accounts,
                as: 'DebitAccount',
              },
            ],
          });
      
          return report;
    }

}


export default new  ReportQueries()