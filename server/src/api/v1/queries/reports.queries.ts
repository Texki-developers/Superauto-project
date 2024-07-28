import { QueryTypes, Sequelize,  } from 'sequelize';
import Accounts from "../../../models/accounts";
import Transaction from "../../../models/transaction";
import Voucher from "../../../models/vouchers";
import sequelize from 'sequelize';
import { db } from '../../../config/database';
import { LedgerWithBalanceResult, OpeningBalanceResult, TransactionDataResult } from '../../../types/db.type';
import { raw } from 'express';
import accountsQueries from './accounts.queries';

class ReportQueries {


   async createDailybookReport(startDate:string,endDate:string){


    const query = `
    WITH account_type AS (
        SELECT 
            a.account_id,
            pl.type AS account_type
        FROM 
            accounts a
        JOIN 
            primary_ledger pl ON a.head = pl.pl_id
    ),
    opening_balance AS (
        SELECT 
            at.account_id,
            COALESCE(SUM(
                CASE 
                    WHEN at.account_type IN ('liability', 'equity', 'revenue') AND t.credit_account = at.account_id THEN t.amount 
                    WHEN at.account_type IN ('liability', 'equity', 'revenue') AND t.debit_account = at.account_id THEN -t.amount
                    WHEN at.account_type IN ('asset', 'expense') AND t.debit_account = at.account_id THEN t.amount
                    WHEN at.account_type IN ('asset', 'expense') AND t.credit_account = at.account_id THEN -t.amount
                    ELSE 0 
                END
            ), 0) AS balance
        FROM 
            transactions t
        JOIN 
            account_type at ON t.debit_account = at.account_id OR t.credit_account = at.account_id
        WHERE 
            t."transaction_date" < :startDate
        GROUP BY at.account_id
    ),
    transaction_data AS (
        SELECT
            t.debit_account AS account_id,
            DATE(t."transaction_date") AS Date,
            t.description AS Description,
            t.voucher_id AS VoucherID,
            CASE 
                WHEN t.debit_account = at.account_id THEN t.amount 
                ELSE 0 
            END AS Debit,
            CASE 
                WHEN t.credit_account = at.account_id THEN t.amount 
                ELSE 0 
            END AS Credit
        FROM 
            transactions t
        JOIN 
            account_type at ON t.debit_account = at.account_id OR t.credit_account = at.account_id
        WHERE 
            t."transaction_date" BETWEEN :startDate AND :endDate
    ),
    combined_data AS (
        SELECT 
            DATE(:startDate) - INTERVAL '1 day' AS Date,
            'Opening Balance' AS Description,
            NULL AS VoucherID,
            0 AS Debit,
            0 AS Credit,
            (SELECT balance FROM opening_balance WHERE account_id = at.account_id) AS RunningBalance,
            at.account_id
        FROM 
            account_type at
        UNION ALL
        SELECT 
            Date,
            Description,
            VoucherID,
            Debit,
            Credit,
            NULL AS RunningBalance,
            account_id
        FROM 
            transaction_data
    ),
    final_data AS (
        SELECT 
            cd.Date,
            cd.Description,
            cd.VoucherID,
            cd.Debit,
            cd.Credit,
            cd.account_id,
            COALESCE(
                SUM(
                    CASE 
                        WHEN cd.description = 'Opening Balance' THEN (SELECT balance FROM opening_balance WHERE account_id = cd.account_id)
                        WHEN at.account_type IN ('liability', 'equity', 'revenue') THEN
                            COALESCE(cd.Credit, 0) - COALESCE(cd.Debit, 0) + (SELECT balance FROM opening_balance WHERE account_id = cd.account_id)
                        WHEN at.account_type = 'expense' THEN
                            COALESCE(cd.Debit, 0) - COALESCE(cd.Credit, 0) + (SELECT balance FROM opening_balance WHERE account_id = cd.account_id)
                        ELSE
                            COALESCE(cd.Debit, 0) - COALESCE(cd.Credit, 0)
                    END
                ) OVER (PARTITION BY cd.account_id ORDER BY COALESCE(cd.Date, '1900-01-01'), cd.VoucherID), 0
            ) AS RunningBalance
        FROM 
            combined_data cd
        JOIN 
            account_type at ON at.account_id = cd.account_id
    ),
    closing_balance AS (
        SELECT 
            at.account_id,
            COALESCE(SUM(
                CASE 
                    WHEN t.debit_account = at.account_id THEN t.amount 
                    ELSE 0 
                END -
                CASE 
                    WHEN t.credit_account = at.account_id THEN t.amount 
                    ELSE 0 
                END
            ), 0) AS balance
        FROM 
            transactions t
        JOIN 
            account_type at ON t.debit_account = at.account_id OR t.credit_account = at.account_id
        WHERE 
            t."transaction_date" >= :startDate
        GROUP BY at.account_id
    ),
    total_closing_balance AS (
        SELECT 
            account_id,
            COALESCE(SUM(balance), 0) AS total_balance
        FROM (
            SELECT account_id, balance FROM opening_balance
            UNION ALL
            SELECT account_id, balance FROM closing_balance
        ) AS combined_balances
        GROUP BY account_id
    ),
    all_data AS (
        SELECT 
            Date,
            Description,
            VoucherID,
            Debit,
            Credit,
            RunningBalance,
            account_id
        FROM 
            final_data
        UNION ALL
        SELECT 
            DATE(:endDate) AS Date,
            'Closing Balance' AS Description,
            NULL AS VoucherID,
            COALESCE((SELECT SUM(debit) FROM combined_data WHERE account_id = cd.account_id), 0) AS Debit,
            COALESCE((SELECT SUM(credit) FROM combined_data WHERE account_id = cd.account_id), 0) AS Credit,
            (SELECT total_balance FROM total_closing_balance WHERE account_id = cd.account_id) AS RunningBalance,
            cd.account_id
        FROM 
            combined_data cd
    ),
FilteredData AS (
    SELECT 
        "date",
description,
        COALESCE(all_data.RunningBalance, 0) AS balance
    FROM 
        all_data
    WHERE 
        "description" IN ('Opening Balance', 'Closing Balance')
),
AggregateData AS (
    SELECT 
        "date",
description,
        SUM(balance) AS balance
    FROM 
        FilteredData
    GROUP BY 
        "date",description
),
RunningTotal AS (
    SELECT 
        "date",
description,
        SUM(balance) OVER (ORDER BY "date" ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_balance
    FROM 
        AggregateData
)
SELECT 
    "date",
description,
NULL AS VoucherID,NULL AS Debit,NULL AS Credit, running_balance as RunningBalance,
     NULL as account_id
FROM 
    RunningTotal

UNION ALL select * from all_data where description NOT IN ('Closing Balance','Opening Balance')
    `
    const [dailybook] = await db.query(query, {
        replacements: { startDate, endDate },
        type: QueryTypes.RAW,
      });
        return dailybook;
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
                  WHEN at.account_type IN ('liability', 'equity', 'revenue') AND t.credit_account = :accountId THEN t.amount 
                  WHEN at.account_type IN ('liability', 'equity', 'revenue') AND t.debit_account = :accountId THEN -t.amount
                  WHEN at.account_type IN ('asset', 'expense') AND t.debit_account = :accountId THEN t.amount
                  WHEN at.account_type IN ('asset', 'expense') AND t.credit_account = :accountId THEN -t.amount
                  ELSE 0 
              END
          ), 0) AS balance
      FROM 
          transactions t
      JOIN 
          account_type at ON t.debit_account = at.account_id OR t.credit_account = at.account_id
      WHERE 
          t."transaction_date" < :startDate
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
  WHEN cd.description = 'Opening Balance' THEN (SELECT balance FROM opening_balance)
                            WHEN at.account_type IN ('liability', 'equity', 'revenue') THEN
                                COALESCE(cd.Credit, 0) - COALESCE(cd.Debit, 0) + (SELECT balance FROM opening_balance)
                            WHEN at.account_type = 'expense' THEN
                                COALESCE(cd.Debit, 0) - COALESCE(cd.Credit, 0) + (SELECT balance FROM opening_balance)
                            ELSE
                                COALESCE(cd.Debit, 0) - COALESCE(cd.Credit, 0)
                        END
                    ) OVER (ORDER BY COALESCE(cd.Date, '1900-01-01'),cd.VoucherID),0
                ) AS RunningBalance
            FROM 
                combined_data cd
            JOIN 
                account_type at ON at.account_id = :accountId
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
  total_closing_balance AS (
      SELECT 
          COALESCE(SUM(balance), 0) AS total_balance
      FROM (
          SELECT opening_balance.balance FROM opening_balance
          UNION ALL
          SELECT balance FROM closing_balance
      ) AS combined_balances
  ),
  all_data AS (
            SELECT 
                Date,
                Description,
                VoucherID,
                Debit,
                Credit,
                RunningBalance
            FROM 
                final_data
  UNION ALL
  SELECT 
                NULL AS Date,
                'Closing Balance' AS Description,
                NULL AS VoucherID,
                COALESCE((SELECT SUM(debit) FROM combined_data), 0) AS Debit,
                COALESCE((SELECT SUM(credit) FROM combined_data), 0) AS Credit,
                (SELECT * FROM total_closing_balance) AS RunningBalance
  )
  
        SELECT 
     *
        FROM 
            all_data;
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
                  WHEN at.account_type IN ('liability', 'equity', 'revenue') AND t.credit_account = :accountId THEN t.amount 
                  WHEN at.account_type IN ('liability', 'equity', 'revenue') AND t.debit_account = :accountId THEN -t.amount
                  WHEN at.account_type IN ('asset', 'expense') AND t.debit_account = :accountId THEN t.amount
                  WHEN at.account_type IN ('asset', 'expense') AND t.credit_account = :accountId THEN -t.amount
                  ELSE 0 
              END
          ), 0) AS balance
      FROM 
          transactions t
      JOIN 
          account_type at ON t.debit_account = at.account_id OR t.credit_account = at.account_id
      WHERE 
          t."transaction_date" < :startDate
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
  WHEN cd.description = 'Opening Balance' THEN (SELECT balance FROM opening_balance)
                            WHEN at.account_type IN ('liability', 'equity', 'revenue') THEN
                                COALESCE(cd.Credit, 0) - COALESCE(cd.Debit, 0) + (SELECT balance FROM opening_balance)
                            WHEN at.account_type = 'expense' THEN
                                COALESCE(cd.Debit, 0) - COALESCE(cd.Credit, 0) + (SELECT balance FROM opening_balance)
                            ELSE
                                COALESCE(cd.Debit, 0) - COALESCE(cd.Credit, 0)
                        END
                    ) OVER (ORDER BY COALESCE(cd.Date, '1900-01-01'),cd.VoucherID),0
                ) AS RunningBalance
            FROM 
                combined_data cd
            JOIN 
                account_type at ON at.account_id = :accountId
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
  total_closing_balance AS (
      SELECT 
          COALESCE(SUM(balance), 0) AS total_balance
      FROM (
          SELECT opening_balance.balance FROM opening_balance
          UNION ALL
          SELECT balance FROM closing_balance
      ) AS combined_balances
  ),
  all_data AS (
            SELECT 
                Date,
                Description,
                VoucherID,
                Debit,
                Credit,
                RunningBalance
            FROM 
                final_data
  UNION ALL
  SELECT 
                NULL AS Date,
                'Closing Balance' AS Description,
                NULL AS VoucherID,
                COALESCE((SELECT SUM(debit) FROM combined_data), 0) AS Debit,
                COALESCE((SELECT SUM(credit) FROM combined_data), 0) AS Credit,
                (SELECT * FROM total_closing_balance) AS RunningBalance
  )
  
        SELECT 
     *
        FROM 
            all_data;
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
                    a.name,
                    p.pl_id AS account_type,
                    p.type,
                    COALESCE(SUM(CASE WHEN t.debit_account = a.account_id THEN t.amount ELSE 0 END), 0) AS total_debit,
                    COALESCE(SUM(CASE WHEN t.credit_account = a.account_id THEN t.amount ELSE 0 END), 0) AS total_credit
                FROM
                    accounts a
                LEFT JOIN
                    transactions t ON (a.account_id = t.debit_account OR a.account_id = t.credit_account)
                    AND t.transaction_date BETWEEN :startDate AND :endDate -- Adjust these dates as needed
                LEFT JOIN
                    primary_ledger p ON a.head = p.pl_id
                GROUP BY
                    a.account_id, a.name, p.pl_id
            ),
            group_by_account_type AS (
                SELECT account_type, SUM(total_debit) AS total_debit, SUM(total_credit) AS total_credit
                FROM account_balances 
                GROUP BY account_type
            ),
            join_ledger AS (
                SELECT total_debit, total_credit, type, ledger_name AS ledger
                FROM group_by_account_type gat
                LEFT JOIN primary_ledger pl ON pl.pl_id = gat.account_type WHERE ledger_name IN ('Sundry Debtors', 'Cash', 'Bank', 'Sundry Creditor', 'Other Payables', 'Salary Payables', 'Purchase', 'Cash') 
            ),
            total_category_all AS (
                SELECT SUM(total_debit) AS all_total_debit, SUM(total_credit) AS all_total_credit, type
                FROM join_ledger
                WHERE ledger IN ('Sundry Debtors', 'Cash', 'Bank', 'Sundry Creditor', 'Other Payables', 'Salary Payables', 'Purchase', 'Cash')
                GROUP BY type
            ),
        
            grand_total AS (
                SELECT SUM(all_total_debit) AS grand_total_debit, SUM(all_total_credit) AS grand_total_credit
                FROM total_category_all 
            ),
balance_total AS (
    SELECT 
    ledger,
        COALESCE(
            SUM(
                CASE 
                    WHEN type IN ('liability', 'equity', 'revenue') THEN total_credit - total_debit
                    WHEN type IN ('asset', 'expense') THEN total_debit - total_credit
                    ELSE 0 
                END
            ), 
            0
        ) AS balance 
    FROM join_ledger WHERE ledger IN ('Sundry Debtors', 'Cash', 'Bank', 'Sundry Creditor', 'Other Payables', 'Salary Payables', 'Purchase', 'Cash') 
    GROUP BY total_credit, total_debit,ledger
), result AS (
  SELECT 
    COALESCE(
        (SELECT SUM(CASE WHEN total_debit > total_credit THEN balance ELSE 0 END)
         FROM balance_total bt
         WHERE bt.ledger = jl.ledger), 0
    ) AS total_debit,
    COALESCE(
        (SELECT SUM(CASE WHEN total_credit > total_debit THEN balance ELSE 0 END)
         FROM balance_total bt
         WHERE bt.ledger = jl.ledger), 0
    ) AS total_credit,
    jl.type,
    jl.ledger
FROM join_ledger jl

), total_category AS (
                SELECT SUM(total_debit) AS total_debit, SUM(total_credit) AS total_credit, type
                FROM result
                WHERE type IN ('asset', 'liability')
                GROUP BY type
            ),
final_balance_total_category AS(
select COALESCE(
            SUM(
                CASE 
                    WHEN type IN ('liability', 'equity', 'revenue') THEN total_credit - total_debit
                    WHEN type IN ('asset', 'expense') THEN total_debit - total_credit
                    ELSE 0 
                END
            ), 
            0
        ) AS balance,type from total_category group by total_category.type),
total_final AS (
SELECT
COALESCE(
(SELECT SUM(CASE WHEN tc.total_debit > tc.total_credit THEN btf.balance ELSE 0 END)
 FROM final_balance_total_category btf WHERE type IN ('asset', 'liability')
 ), 
0
) AS total_debit,

COALESCE(
(SELECT SUM(CASE WHEN tc.total_credit > tc.total_debit THEN btf.balance ELSE 0 END)
 FROM final_balance_total_category btf WHERE type IN ('asset', 'liability')
 ), 
0
) AS total_credit,
tc.type   FROM total_category tc
)            

     SELECT total_debit,total_credit,type,ledger from result UNION ALL
            SELECT total_debit, total_credit, type,'total' 
            FROM total_final 
            UNION ALL 
            SELECT grand_total_debit, grand_total_credit, NULL AS type, 'Grand Total' AS ledger 
            FROM grand_total 
            `

            const [trialBalance] = await db.query(trialBalancequery, {
                replacements: { startDate, endDate  },
                type: QueryTypes.RAW,
              })

              const result: any[] = [];
              let total: any= null;

              trialBalance.forEach((item:any) => {
                if (item.ledger === 'Grand Total') {
                  total = item;
                } else {
                  result.push(item);
                }
              });

                return {
                    result,
                    
                    total:{
                        debit:total.total_debit,
                        credit:total.total_credit,
                    }
                    
                
                };
      }


     async balanceSheet(){
        const balanceSheetQuery = `WITH account_balances AS (
            SELECT
                a.account_id,
                a.name,
                p.pl_id AS account_type,
        p.type,
                COALESCE(SUM(CASE WHEN t.debit_account = a.account_id THEN t.amount ELSE 0 END), 0) AS total_debit,
                COALESCE(SUM(CASE WHEN t.credit_account = a.account_id THEN t.amount ELSE 0 END), 0) AS total_credit
            FROM
                accounts a
            LEFT JOIN
                transactions t ON a.account_id = t.debit_account OR a.account_id = t.credit_account
            LEFT JOIN
                primary_ledger p ON a.head = p.pl_id
            GROUP BY
                a.account_id, a.name, p.pl_id
        ),
        with_balances AS (
        SELECT
            account_id,
            name,
            account_type,
            total_debit,
            total_credit,
        type,
            total_debit - total_credit AS balance
        FROM
            account_balances
        ORDER BY
            account_type, name
        ),
        grouped_type AS (
          SELECT account_type,SUM(balance) as balance,type AS category FROM with_balances GROUP BY account_type,type
        ),
        with_pl_name AS (
          SELECT account_type, balance, category, ledger_name as ledger FROM grouped_type LEFT JOIN primary_ledger prld on prld.pl_id = grouped_type.account_type
        ),
        sum_of_category AS (
        select  category,sum(balance) AS balance from with_pl_name group by category
        ),
        
        final_data AS (
        select account_type,balance,category,ledger  from with_pl_name  UNION all
        select
         NULL AS account_type,
        sum_of_category.balance,
        category,
        'Total' AS ledger from sum_of_category 
        
        )
        
        SELECT * FROM final_data where category in ('asset','liability','equity') order by account_type`

        const [balanceSheet] = await db.query(balanceSheetQuery, {
            // replacements: { startDate, endDate  },
            type: QueryTypes.RAW,
          })
          const profit = await this.profitAndLoss()
          let netProfit 
        
            profit.map((item:any)=>{
            if(item.name  === 'to_net_profit'){
                netProfit= item
            }
          })
          balanceSheet.push(netProfit)
            return balanceSheet
      }

      async profitAndLoss(){
        const accountNames = [
            'Purchase',
            'Capital A/C',
            'Direct Expense',
            'Sale',
            'Salary Payables'
        ];
        
        const [purchase, capital, directExpense, sale, salaryPayable] = await Promise.all(
            accountNames.map(accountsQueries.findAccount)
        );
        const query  = `
        WITH opening_inventory AS (
            SELECT SUM(purchase_rate) AS opening_inventory 
            FROM inventory 
            WHERE date_of_purchase < '2023-06-06'
        ),
        closing_inventory AS (
            SELECT SUM(purchase_rate) AS closing_inventory 
            FROM inventory 
            WHERE date_of_purchase > '2024-06-06'
        ),
        purchase AS (
            SELECT 
                a.account_id,
                a.name,
                COALESCE(SUM(CASE WHEN t.credit_account = a.account_id THEN t.amount ELSE 0 END), 0) - 
                COALESCE(SUM(CASE WHEN t.debit_account = a.account_id THEN t.amount ELSE 0 END), 0) AS Purchase
            FROM
                accounts a
            LEFT JOIN
                transactions t ON a.account_id IN (t.debit_account, t.credit_account)
            LEFT JOIN
                primary_ledger p ON a.head = p.pl_id
            WHERE
                a.account_id = ${purchase}
            GROUP BY
                a.account_id, a.name
        ),
        capital AS (
            SELECT 
                a.account_id,
                a.name,
                COALESCE(SUM(CASE WHEN t.credit_account = a.account_id THEN t.amount ELSE 0 END), 0) - 
                COALESCE(SUM(CASE WHEN t.debit_account = a.account_id THEN t.amount ELSE 0 END), 0) AS capital
            FROM
                accounts a
            LEFT JOIN
                transactions t ON a.account_id IN (t.debit_account, t.credit_account)
            LEFT JOIN
                primary_ledger p ON a.head = p.pl_id
            WHERE
                a.account_id = ${capital}
            GROUP BY
                a.account_id, a.name
        ),
        direct_expense AS (
            SELECT 
                a.account_id,
                a.name,
                COALESCE(SUM(CASE WHEN t.credit_account = a.account_id THEN t.amount ELSE 0 END), 0) - 
                COALESCE(SUM(CASE WHEN t.debit_account = a.account_id THEN t.amount ELSE 0 END), 0) AS Direct_Expense
            FROM
                accounts a
            LEFT JOIN
                transactions t ON a.account_id IN (t.debit_account, t.credit_account)
            LEFT JOIN
                primary_ledger p ON a.head = p.pl_id
            WHERE
                a.account_id = ${directExpense}
            GROUP BY
                a.account_id, a.name
        ),
        sales AS (
            SELECT 
                a.account_id,
                a.name,
                COALESCE(SUM(CASE WHEN t.credit_account = a.account_id THEN t.amount ELSE 0 END), 0) - 
                COALESCE(SUM(CASE WHEN t.debit_account = a.account_id THEN t.amount ELSE 0 END), 0) AS Sales
            FROM
                accounts a
            LEFT JOIN
                transactions t ON a.account_id IN (t.debit_account, t.credit_account)
            LEFT JOIN
                primary_ledger p ON a.head = p.pl_id
            WHERE
                a.account_id = ${sale}
            GROUP BY
                a.account_id, a.name
        ),
        salary AS (
            SELECT 
                a.account_id,
                a.name,
                COALESCE(SUM(CASE WHEN t.credit_account = a.account_id THEN t.amount ELSE 0 END), 0) - 
                COALESCE(SUM(CASE WHEN t.debit_account = a.account_id THEN t.amount ELSE 0 END), 0) AS salary
            FROM
                accounts a
            LEFT JOIN
                transactions t ON a.account_id IN (t.debit_account, t.credit_account)
            LEFT JOIN
                primary_ledger p ON a.head = p.pl_id
            WHERE
                a.account_id = ${salaryPayable}
            GROUP BY
                a.account_id, a.name
        )
        SELECT 
            account_id,
            name,
            "Total"
        FROM 
            (
                SELECT 
                    account_id,
                    name,
                    Purchase AS "Total"
                FROM 
                    purchase 
                
                UNION ALL 
                
                SELECT 
                    account_id,
                    'to_salaries' as name,
                    salary AS "Total"
                FROM 
                    salary
                
                UNION ALL
                
                SELECT 
                    account_id,
                    'to_other_direct_expense' as name,
                    Direct_Expense AS "Total"
                FROM 
                    direct_expense
                
                UNION ALL
                
                SELECT 
                    NULL AS account_id,
                    'by_investment' as name,
                    capital AS "Total"
                FROM 
                    capital
                
                UNION ALL
                
                SELECT 
                    NULL AS account_id,
                    'by_closing_inventory' as name,
                    closing_inventory.closing_inventory AS "Total"
                FROM 
                    closing_inventory
                
                UNION ALL
                
                SELECT 
                    account_id,
                    'by_sales' as name,
                    Sales AS "Total"
                FROM 
                    sales
                
                UNION ALL 
                
                SELECT 
                    NULL AS account_id,
                    'to_opening_inventory' AS name,
                    opening_inventory.opening_inventory AS "Total"
                FROM 
                    opening_inventory
                
                UNION ALL
                
                SELECT 
                    NULL AS account_id,
                    'by_gross_profit_loss' AS name,
                    COALESCE(
                        (
                            SELECT 
                                COALESCE(SUM(Sales), 0) + COALESCE(SUM(closing_inventory), 0) + COALESCE(SUM(opening_inventory), 0) + COALESCE(SUM(Purchase), 0) - COALESCE(SUM(Direct_Expense), 0) AS "Total"
                            FROM 
                                sales, closing_inventory, opening_inventory, purchase, direct_expense
                        ), 
                        0
                    )
                
                UNION ALL
                
                SELECT 
                    NULL AS account_id,
                    'to_net_profit' AS name,
                    COALESCE(
                        (
                            SELECT 
                                COALESCE(SUM(Sales), 0) + COALESCE(SUM(closing_inventory), 0) + COALESCE(SUM(opening_inventory), 0) + COALESCE(SUM(Purchase), 0) - COALESCE(SUM(Direct_Expense), 0) - COALESCE(SUM(salary), 0) AS "Total"
                            FROM 
                                sales, closing_inventory, opening_inventory, purchase, direct_expense, salary
                        ), 
                        0
                    )
                
                UNION ALL
                
                SELECT 
                    NULL AS account_id,
                    'by_net_loss' AS name,
                    COALESCE(
                        (
                            SELECT 
                                COALESCE(SUM(capital), 0) - COALESCE(SUM(Sales), 0) - COALESCE(SUM(closing_inventory), 0) - COALESCE(SUM(opening_inventory), 0) - COALESCE(SUM(Purchase), 0) + COALESCE(SUM(Direct_Expense), 0) AS "Total"
                            FROM 
                                capital, sales, closing_inventory, opening_inventory, purchase, direct_expense
                        ), 
                        0
                    )
            ) AS combined_results
        ORDER BY 
            name;
        `
        const [reportAndLoss]:any = await db.query(query, {
            // replacements: { startDate, endDate  },
            type: QueryTypes.RAW,
          })
          


            return reportAndLoss;

      }

    }      



   
   

export default new  ReportQueries()