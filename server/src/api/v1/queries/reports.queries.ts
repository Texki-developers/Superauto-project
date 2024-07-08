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
      
      const [cashbookReport] = await db.query(ledgerQuery, {
        replacements: { startDate, endDate,accountId  },
        type: QueryTypes.RAW,
      })
      
        return cashbookReport;
      }

      async trialBalanceReport (startDate:string,endDate:string){
            const trialBalancequery = `
            WITH account_balances AS (
                SELECT
                    a.account_id,
                    a.name AS account_name,
                    pl.type AS account_type,
                    pl.ledger_name AS category,
                    COALESCE(SUM(CASE WHEN t.debit_account = a.account_id THEN t.amount ELSE 0 END), 0) AS total_debits,
                    COALESCE(SUM(CASE WHEN t.credit_account = a.account_id THEN t.amount ELSE 0 END), 0) AS total_credits
                FROM
                    accounts a
                LEFT JOIN
                    transactions t ON a.account_id = t.debit_account OR a.account_id = t.credit_account
                LEFT JOIN
                    primary_ledger pl ON a.head = pl.pl_id
                WHERE
                    t.transaction_date >= :startDate -- Replace with your fromdate parameter
                    AND t.transaction_date <= :endDate -- Replace with your enddate parameter
                GROUP BY
                    a.account_id, a.name, pl.type, pl.ledger_name
            ),
            categorized_balances AS (
                SELECT
                    CASE
                        WHEN account_type = 'asset' THEN 'Current Assets'
                        WHEN account_type = 'liability' THEN 'Current Liabilities'
                        WHEN account_type = 'equity' THEN 'Equity'
                        WHEN account_type = 'expense' THEN 'Expenses'
                        WHEN account_type = 'revenue' THEN 'Revenue'
                        ELSE 'Others'
                    END AS account_group,
                    category,
                    SUM(total_debits) AS debit_amount,
                    SUM(total_credits) AS credit_amount
                FROM
                    account_balances
                GROUP BY
                    account_group, category
            ),
            grouped_balances AS (
                SELECT
                    account_group,
                    category,
                    NULL AS account_name, -- Placeholder for detailed rows
                    debit_amount,
                    credit_amount
                FROM
                    categorized_balances
            
                UNION ALL
            
                SELECT
                    'Total ' || category AS account_group,
                    category,
                    'Total ' || category AS account_name,
                    SUM(debit_amount) AS debit_amount,
                    SUM(credit_amount) AS credit_amount
                FROM
                    categorized_balances
                GROUP BY
                    category
            )
            SELECT
                account_group,
                category,
                debit_amount,
                credit_amount
            FROM
                grouped_balances
            ORDER BY
                CASE WHEN account_group LIKE 'Total%' THEN 2 ELSE 1 END,
                account_group,
                category;
            `

            const [trialBalance] = await db.query(trialBalancequery, {
                replacements: { startDate, endDate  },
                type: QueryTypes.RAW,
              })
              
                return trialBalance;
      }

    }      


   

export default new  ReportQueries()