import reportsQueries from '../queries/reports.queries';
import accountsQueries from '../queries/accounts.queries';
import { Op } from 'sequelize';

class ReportsService {
  dailybookReport(voucherPrefix: string, fromDate: string, toDate: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const whereCondition: any = {};

        if (voucherPrefix) {
          whereCondition.voucher_id = {
            [Op.like]: `${voucherPrefix}%`,
          };
        }

        if (fromDate && toDate) {
          whereCondition.transaction_date = {
            [Op.between]: [new Date(fromDate), new Date(toDate)],
          };
        } else if (fromDate) {
          whereCondition.transaction_date = {
            [Op.gte]: new Date(fromDate),
          };
        } else if (toDate) {
          whereCondition.transaction_date = {
            [Op.lte]: new Date(toDate),
          };
        }

        const Brands = await reportsQueries.createDailybookReport(whereCondition);

        return resolve(Brands);
      } catch (err) {
        reject({ message: `Failed to List daily book : ${err}` });
      }
    });
  }

  listdailyBookVoucher() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await reportsQueries.listDailybookVoucher();

        resolve(result);
      } catch (err) {
        reject({ message: `Failed to List Brands: ${err}` });
      }
    });
  }

  listLedgers() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await reportsQueries.listLedgers();

        resolve(result);
      } catch (err) {
        reject({ message: `Failed to List Brands: ${err}` });
      }
    });
  }

  listLedgersForLedgerReport() {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (err) {
        reject({ message: `Failed to List Brands: ${err}` });
      }
    });
  }

  ledgerReport(ledger: number, fromDate: string, toDate: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await reportsQueries.createLedgerReport(fromDate, toDate, ledger);

        resolve(result);
      } catch (err) {
        reject({ message: `Failed to List Brands: ${err}` });
      }
    });
  }

  cashbookReport(fromDate: string, toDate: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const account = await accountsQueries.findAccount('Cash');
        const result = await reportsQueries.cashbookReport(fromDate, toDate, account || 1);
        resolve(result);
      } catch (err) {
        reject({ message: `Failed to List Brands: ${err}` });
      }
    });
  }

  trialBalanceReport(startDate: string, endDate: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const trialbalanceResult = await reportsQueries.trialBalanceReport(startDate, endDate);
        return resolve(trialbalanceResult);
      } catch (err) {
        reject({ message: `Failed to List Brands: ${err}` });
      }
    });
  }

  balanceSheetReport(startYear: string, endYear: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const balanceSheet = await reportsQueries.balanceSheet(startYear, endYear);
        return resolve(balanceSheet);
      } catch (err) {
        reject({ message: `Failed to List Brands: ${err}` });
      }
    });
  }

  profitAndLoss(startYear: string, endYear: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const balanceSheet = await reportsQueries.profitAndLoss(startYear, endYear);
        return resolve(balanceSheet);
      } catch (err) {
        reject({ message: `Failed to List Brands: ${err}` });
      }
    });
  }

  saleReport(fromDate: string, toDate: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const sales = await accountsQueries.findAccount('Sale');
        const balanceSheet = await reportsQueries.cashbookReport(fromDate, toDate, sales || 14);
        return resolve(balanceSheet);
      } catch (err) {
        reject({ message: `Failed to List Brands: ${err}` });
      }
    });
  }
}

export default new ReportsService();
