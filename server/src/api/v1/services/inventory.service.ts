import { IfileReturn } from '../../../types/base.type';
import {
  IDsTransactionAttributes,
  IFinancerTransactionAttributes,
  IInventoryAttributes,
  IServiceTransactionAttributes,
  ITransactionParams,
} from '../../../types/db.type';
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
        const financerDetails: IFinancerTransactionAttributes[] = [];
        await Promise.all(
          body.map(async (items) => {
            const [Vehicle, cash] = await Promise.all([
              inventoryQueries.findVehicle(items.regNum),
              accountsQueries.findAccount('cash'),
            ]);

            if (Vehicle && Vehicle.account_id && items.financerId) {
              transactions.push({
                amount: items.amount,
                credit_account: Vehicle.account_id,
                debit_account: items.financerId,
              });
              financerDetails.push({
                financer_id: items.financerId,
                vehicle_id: Vehicle.inventory_id,
              });
            }
            if (Vehicle && items.financerId && cash) {
              transactions.push({
                amount: items.amount,
                credit_account: items.financerId,
                debit_account: cash,
              });
            }
          })
        );

        const operations = [
          async (transaction: any): Promise<void> => {
            await accountsQueries.generateTransaction(transactions, { transaction });
          },
          async (transaction: any) => {
            await inventoryQueries.addTofinanceTable(financerDetails, { transaction });
          },
        ];

        await performTransaction(operations);

        return resolve({
          message: 'Vehicle assigned to Financer',
        });
      } catch (error) {
        reject(new Error('Failed to generate transaction when assign vehicle to financer'));
      }
    });
  }

  assignVehiclesToDeliveryService(body: IassignVehicle[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const transactions: ITransactionParams[] = [];
        const dsTransactions: IDsTransactionAttributes[] = [];

        const directExpense = await accountsQueries.findAccount('directExpense');
        if (!directExpense) {
          throw new Error('Direct expense account not found');
        }

        await Promise.all(
          body.map(async (item) => {
            const vehicle = await inventoryQueries.findVehicle(item.regNum);
            if (item.serviceId) {
              transactions.push({
                amount: item.amount,
                debit_account: directExpense,
                credit_account: item.serviceId,
              });

              if (vehicle?.inventory_id) {
                dsTransactions.push({
                  ds_id: item.serviceId,
                  vehicle_id: vehicle.inventory_id,
                });
              }
            }
          })
        );

        const operations = [
          async (transaction: any): Promise<void> => {
            await accountsQueries.generateTransaction(transactions, { transaction });
          },
          async (transaction: any): Promise<void> => {
            await inventoryQueries.addTodeliveryServiceTable(dsTransactions, { transaction });
          },
        ];

        await performTransaction(operations);

        return resolve({ message: 'Vehicle assigned to Delivery Service Shop' });
      } catch (error) {
        throw new Error('Failed to generate transaction when assigning vehicle to delivery Service');
      }
    });
  }

  assignVehiclesToService(body: IassignVehicle[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const transactions: ITransactionParams[] = [];
        const serviceTransaction: IServiceTransactionAttributes[] = [];
        const directExpense = await accountsQueries.findAccount('directExpense');
        if (!directExpense) {
          throw new Error('Direct expense account not found');
        }

        await Promise.all(
          body.map(async (item) => {
            const vehicle = await inventoryQueries.findVehicle(item.regNum);
            if (item.serviceId) {
              transactions.push({
                amount: item.amount,
                debit_account: directExpense,
                credit_account: item.serviceId,
              });

              if (vehicle?.inventory_id) {
                serviceTransaction.push({
                  vehicle_id: vehicle?.inventory_id,
                  service_shop_id: item.serviceId,
                });
              }
            }
          })
        );

        await accountsQueries.generateTransaction(transactions);

        return resolve({
          message: 'Vehicle assigned to delivery Shop',
        });
      } catch (error) {
        throw new Error('Failed to generate transaction when assigning vehicle to delivery shop');
      }
    });
  }
}

export default new InventoryService();
