import { QueryTypes, Sequelize,  } from 'sequelize';
import Accounts from "../../../models/accounts";
import Transaction from "../../../models/transaction";
import Voucher from "../../../models/vouchers";
import sequelize from 'sequelize';
import { db } from '../../../config/database';
import { LedgerWithBalanceResult, OpeningBalanceResult, TransactionDataResult } from '../../../types/db.type';
import { raw } from 'express';

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
            attributes:["voucher_id","debit_account","credit_account","amount","description","transaction_date"],
            order: [['createdAt', 'ASC']],
          });
      
          return report;
    }

    async listDailybookVoucher(){
      return await Voucher.findAll({

        attributes:['prefix']
      })
    }
    async listLedgers(){
      return await Accounts.findAll({

        attributes:['name',"account_id"]
      })}

      async createLedgerReport(startDate:string, endDate:string, accountId:number) {
        const ledgerQuery = `
        WITH account_type AS (
          SELECT 
              a.account_id,
              pl.type AS account_type
          FROM 
              accounts a
          JOIN 
              primary_ledger pl ON a.head = pl.pl_id
          WHERE 
              a.account_id = :accountId
      ),
      opening_balance AS (
          SELECT 
              COALESCE(SUM(
                  CASE 
                      WHEN t.debit_account = :accountId THEN t.amount 
                      ELSE 0 
                  END -
                  CASE 
                      WHEN t.credit_account = :accountId THEN t.amount 
                      ELSE 0 
                  END
              ), 0) AS balance
          FROM 
              transactions t
          WHERE 
              t."transaction_date" < :startDate
      ),
      closing_balance AS (
          SELECT 
              COALESCE(SUM(
                  CASE 
                      WHEN t.debit_account = :accountId THEN t.amount 
                      ELSE 0 
                  END -
                  CASE 
                      WHEN t.credit_account = :accountId THEN t.amount 
                      ELSE 0 
                  END
              ), 0) AS balance
          FROM 
              transactions t
          WHERE 
              t."transaction_date" >= :startDate
      ),
      transaction_data AS (
          SELECT
              DATE(t."transaction_date") AS Date,
              t.description AS Description,
              t.voucher_id AS VoucherID,
              CASE 
                  WHEN t.debit_account = :accountId THEN t.amount 
                  ELSE 0 
              END AS Debit,
              CASE 
                  WHEN t.credit_account = :accountId THEN t.amount 
                  ELSE 0 
              END AS Credit
          FROM 
              transactions t
          WHERE 
              t."transaction_date" BETWEEN :startDate AND :endDate
              AND (t.debit_account = :accountId OR t.credit_account = :accountId)
      ),
      combined_data AS (
          SELECT 
              NULL AS Date,
              'Opening Balance' AS Description,
              NULL AS VoucherID,
              0 AS Debit,
              0 AS Credit,
              (SELECT balance FROM opening_balance) AS RunningBalance
          UNION ALL
          SELECT 
              Date,
              Description,
              VoucherID,
              Debit,
              Credit,
              NULL AS RunningBalance
          FROM 
              transaction_data
          UNION ALL
          SELECT 
              NULL AS Date,
              'Closing Balance' AS Description,
              NULL AS VoucherID,
              0 AS Debit,
              0 AS Credit,
              (SELECT balance FROM closing_balance) AS RunningBalance
      ),
      final_data AS (
          SELECT 
              cd.Date,
              cd.Description,
              cd.VoucherID,
              cd.Debit,
              cd.Credit,
              COALESCE(
                  SUM(
                      CASE 
                          WHEN at.account_type IN ('liability', 'equity', 'revenue') THEN
                              COALESCE(cd.Credit, 0) - COALESCE(cd.Debit, 0) + (SELECT balance FROM opening_balance)
                          WHEN at.account_type = 'expense' THEN
                              COALESCE(cd.Debit, 0) - COALESCE(cd.Credit, 0) + (SELECT balance FROM opening_balance)
                          ELSE
                              COALESCE(cd.Debit, 0) - COALESCE(cd.Credit, 0) + (SELECT balance FROM opening_balance)
                      END
                  ) OVER (ORDER BY COALESCE(cd.Date, '1900-01-01'), cd.VoucherID),
                  (SELECT balance FROM opening_balance) + (SELECT balance FROM closing_balance)
              ) AS RunningBalance,
              COALESCE(
                  LAST_VALUE(
                      (SELECT balance FROM opening_balance) + (SELECT balance FROM closing_balance)
                  ) OVER (ORDER BY COALESCE(cd.Date, '1900-01-01'), cd.VoucherID ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW),
                  0
              ) AS ClosingBalance
          FROM 
              combined_data cd
          JOIN 
              account_type at ON at.account_id = :accountId
      )
      SELECT 
          Date,
          Description,
          VoucherID,
          Debit,
          Credit,
          RunningBalance,
          ClosingBalance
      FROM 
          final_data
      ORDER BY 
          COALESCE(Date, '1900-01-01'), VoucherID;
      
      `;
      
      const [ledgerWithBalanceResult] = await db.query(ledgerQuery, {
        replacements: { startDate, endDate, accountId },
        type: QueryTypes.RAW,
      });
      
        return ledgerWithBalanceResult;
      }

      async cashbookReport(query:string,startDate:string, endDate:string,accountId:number){
        const ledgerQuery = `
        WITH account_type AS (
            SELECT 
                a.account_id,
                pl.type AS account_type
            FROM 
                accounts a
            JOIN 
                primary_ledger pl ON a.head = pl.pl_id
            WHERE 
                a.account_id = :accountId
        ),
        opening_balance AS (
            SELECT 
                COALESCE(SUM(
                    CASE 
                        WHEN t.debit_account = :accountId THEN t.amount 
                        ELSE 0 
                    END -
                    CASE 
                        WHEN t.credit_account = :accountId THEN t.amount 
                        ELSE 0 
                    END
                ), 0) AS balance
            FROM 
                transactions t
            WHERE 
                t."transaction_date" < :startDate
        ),
        closing_balance AS (
            SELECT 
                COALESCE(SUM(
                    CASE 
                        WHEN t.debit_account = :accountId THEN t.amount 
                        ELSE 0 
                    END -
                    CASE 
                        WHEN t.credit_account = :accountId THEN t.amount 
                        ELSE 0 
                    END
                ), 0) AS balance
            FROM 
                transactions t
            WHERE 
                t."transaction_date" >= :startDate
        ),
        transaction_data AS (
            SELECT
                DATE(t."transaction_date") AS Date,
                t.description AS Description,
                t.voucher_id AS VoucherID,
                CASE 
                    WHEN t.debit_account = :accountId THEN t.amount 
                    ELSE 0 
                END AS Debit,
                CASE 
                    WHEN t.credit_account = :accountId THEN t.amount 
                    ELSE 0 
                END AS Credit
            FROM 
                transactions t
            WHERE 
                t."transaction_date" BETWEEN :startDate AND :endDate
                AND (t.debit_account = :accountId OR t.credit_account = :accountId)
        ),
        combined_data AS (
            SELECT 
                NULL AS Date,
                'Opening Balance' AS Description,
                NULL AS VoucherID,
                0 AS Debit,
                0 AS Credit,
                (SELECT balance FROM opening_balance) AS RunningBalance
            UNION ALL
            SELECT 
                Date,
                Description,
                VoucherID,
                Debit,
                Credit,
                NULL AS RunningBalance
            FROM 
                transaction_data
            UNION ALL
            SELECT 
                NULL AS Date,
                'Closing Balance' AS Description,
                NULL AS VoucherID,
                0 AS Debit,
                0 AS Credit,
                (SELECT balance FROM closing_balance) AS RunningBalance
        ),
        final_data AS (
            SELECT 
                cd.Date,
                cd.Description,
                cd.VoucherID,
                cd.Debit,
                cd.Credit,
                COALESCE(
                    SUM(
                        CASE 
                            WHEN at.account_type IN ('liability', 'equity', 'revenue') THEN
                                COALESCE(cd.Credit, 0) - COALESCE(cd.Debit, 0) + (SELECT balance FROM opening_balance)
                            WHEN at.account_type = 'expense' THEN
                                COALESCE(cd.Debit, 0) - COALESCE(cd.Credit, 0) + (SELECT balance FROM opening_balance)
                            ELSE
                                COALESCE(cd.Debit, 0) - COALESCE(cd.Credit, 0) + (SELECT balance FROM opening_balance)
                        END
                    ) OVER (ORDER BY COALESCE(cd.Date, '1900-01-01'), cd.VoucherID),
                    (SELECT balance FROM opening_balance) + (SELECT balance FROM closing_balance)
                ) AS RunningBalance,
                COALESCE(
                    LAST_VALUE(
                        (SELECT balance FROM opening_balance) + (SELECT balance FROM closing_balance)
                    ) OVER (ORDER BY COALESCE(cd.Date, '1900-01-01'), cd.VoucherID ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW),
                    0
                ) AS ClosingBalance
            FROM 
                combined_data cd
            JOIN 
                account_type at ON at.account_id = :accountId
        )
        SELECT 
            Date,
            Description,
            VoucherID,
            Debit,
            Credit,
            RunningBalance,
            ClosingBalance
        FROM 
            final_data
        ORDER BY 
            COALESCE(Date, '1900-01-01'), VoucherID;  
      `;
      
      const [ledgerWithBalanceResult] = await db.query(ledgerQuery, {
        replacements: { startDate, endDate,accountId  },
        type: QueryTypes.RAW,
      })
      
        return ledgerWithBalanceResult;
      }
    }      


export default new  ReportQueries()