import { IfileReturn } from '../../../types/base.type';
import { IInventoryAttributes, ITransactionParams } from '../../../types/db.type';
import { IassignVehicle, IInventoryBody } from '../../../types/request.type';
import { E_PRIMARY_LEDGERS } from '../../../utils/constants/constants';
import messages from '../../../utils/constants/messages';
import { uploadFile } from '../../../utils/fileUpload/fileUpload';
import { performTransaction } from '../../../utils/PerformTransaction/PerformTransaction';
import accountsQueries from '../queries/accounts.queries';
import inventoryQueries from '../queries/inventory.queries';

class InventoryService {
  addVehicle = (data: IInventoryBody) => {
    return new Promise(async (resolve, reject) => {
      const allowedExtension = ['pdf', 'jpg'];
      const fileType = 'doc';
      try {
        const docs = [data.rc_book, data.proof_doc, data.insurance_doc];
        const docsResult: any = await Promise.all(docs.map((file) => uploadFile(file, fileType, allowedExtension)));
        let uploadDocs;

        let brandID;
        if (docsResult && docsResult.length > 0) {
          uploadDocs = await inventoryQueries.uploadManyDocs(docsResult);
        }

        if (data.isNew) {
          const brandResult = await inventoryQueries.uploadBrandModel(data.brand, data.model);
          if (brandResult) {
            brandID = brandResult.brand_model_id;
          }
        } else {
          brandID = data?.brand_model_id;
        }

        const insertInventoryData: IInventoryAttributes = {
          account_id: data.account_id,
          brand_model_id: brandID || 0,
          year_of_manufacture: data.year_of_manufacture,
          ownership_name: data.ownership_name,
          purchase_rate: data.purchase_rate,
          insurance_date: data.insurance_date,
          sale_status: data.sale_status,
          rc_book: uploadDocs?.[0]?.file_id ?? null,
          insurance_doc: uploadDocs?.[3]?.file_id ?? null,
          proof_doc: uploadDocs?.[2]?.file_id ?? null,
          date_of_purchase: data.date_of_purchase,
          sold_price: data.sold_price,
          registration_number: data.registration_number,
        };

        const purchaseResult = await accountsQueries.findAccount('Purchase');
        const cashResult = await accountsQueries.findAccount('Cash');
        if (purchaseResult && cashResult) {
          const operations = [
            async (transaction: any): Promise<void> => {
              await inventoryQueries.addVehicle(insertInventoryData, { transaction });
            },
            async (transaction: any) => {
              await accountsQueries.generateTransaction(
                [
                  {
                    amount: data.purchase_rate,
                    credit_account: data.account_id,
                    debit_account: purchaseResult,
                  },
                  {
                    amount: data.purchase_rate,
                    credit_account: cashResult,
                    debit_account: data.account_id,
                  },
                ],
                { transaction }
              );
            },
          ];

          await performTransaction(operations);
        }

        return resolve({ message: messages.success.ACCOUNT_CREATED });
      } catch (error) {
        throw new Error('Failed to add Vehicle to inventory...');
      }
    });
  };

  assignVehiclesToFinance(body: IassignVehicle[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const transactions: ITransactionParams[] = [];

        await Promise.all(
          body.map(async (items) => {
            const [Vehicle, customer, cash, financer] = await Promise.all([
              inventoryQueries.findVehicle(items.regNum),
              accountsQueries.findAccount('customer'),
              accountsQueries.findAccount('cash'),
              accountsQueries.findAccount(E_PRIMARY_LEDGERS.FINANCER),
            ]);

            if (Vehicle && customer && financer) {
              transactions.push({
                amount: items.amount,
                credit_account: customer,
                debit_account: financer,
              });
            } else if (Vehicle && financer && cash) {
              transactions.push(
                {
                  amount: items.amount,
                  credit_account: cash,
                  debit_account: financer,
                }
              );
            }
          })
        );

        await accountsQueries.generateTransaction(transactions);
        resolve({
          message: 'Vehicle assigned to Financer',
        });
      } catch (error) {
        reject(new Error('Failed to generate transaction when assign vehicle to financer'));
      }
    });
  }

  assignVehiclesToService(body: IassignVehicle[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const transactions: ITransactionParams[] = [];
        await Promise.all(
          body.map(async (items) => {
            const [serviceShop, directExpense] = await Promise.all([
              accountsQueries.findAccount(E_PRIMARY_LEDGERS.SERVICE_SHOP),
              accountsQueries.findAccount('directExpense'),
            ]);

            if (serviceShop && directExpense) {
              transactions.push({
                amount: items.amount,
                debit_account: directExpense,
                credit_account: serviceShop,
              });
            }
          })
        );

        await accountsQueries.generateTransaction(transactions);
        resolve({
          message: 'Vehicle assigned to Service Shop',
        });
      } catch (error) {
        reject(new Error('Failed to generate transaction when assign vehicle to Service'));
      }
    });
  }


  assignVehiclesToDelivery(body: IassignVehicle[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const transactions: ITransactionParams[] = [];
        await Promise.all(
          body.map(async (items) => {
            const [serviceShop, directExpense] = await Promise.all([
              accountsQueries.findAccount(E_PRIMARY_LEDGERS.DELIVERY_SERVICE),
              accountsQueries.findAccount('directExpense'),
            ]);

            if (serviceShop && directExpense) {
              transactions.push({
                amount: items.amount,
                debit_account: directExpense,
                credit_account: serviceShop,
              });
            }
          })
        );

        await accountsQueries.generateTransaction(transactions);
        resolve({
          message: 'Vehicle assigned to Service Shop',
        });
      } catch (error) {
        reject(new Error('Failed to generate transaction when assign vehicle to Service'));
      }
    });
  }
}

export default new InventoryService();
