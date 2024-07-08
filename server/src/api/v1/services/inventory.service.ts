import { FindOptions } from 'sequelize';
import { db } from '../../../config/database';
import { IfileReturn } from '../../../types/base.type';
import {
  IDsTransactionAttributes,
  IFinancerTransactionAttributes,
  IInventoryAttributes,
  IServiceTransactionAttributes,
  ITransactionParams,
} from '../../../types/db.type';
import { IassignVehicle, IInventoryBody, IsellVehicleBody } from '../../../types/request.type';
import { E_ACCOUNT_CATEGORIES, E_LEDGERS_BASIC, E_VOUCHERS } from '../../../utils/constants/constants';
import messages from '../../../utils/constants/messages';
import { uploadFile } from '../../../utils/fileUpload/fileUpload';
import getVoucher from '../../../utils/getVoucher/getVoucher';
import { performTransaction } from '../../../utils/PerformTransaction/PerformTransaction';
import accountsQueries from '../queries/accounts.queries';
import inventoryQueries from '../queries/inventory.queries';
import Accounts from '../../../models/accounts';
import SaleReturn from '../../../models/salesReturn';
import accountsService from './accounts.service';

class InventoryService {
  addVehicle = (data: IInventoryBody) => {
    return new Promise(async (resolve, reject) => {
      const allowedExtension = ['pdf', 'jpg', 'jpeg', 'png'];
      const fileType = 'doc';
      try {
        const docs = [data.rc_book, data.proof_doc, data.insurance_doc];
        console.log(docs, 'THE DC');
        const dbTransaction = await db.transaction();

        const docsResult: any = await Promise.all(docs.map((file) => uploadFile(file, fileType, allowedExtension)));
        console.log(docsResult, 'Doc result');
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

        if (data.party_phone_number && data?.party_phone_number?.length > 0) {
          if (data.party_name) {
            const newAccountResult = await accountsService.accountHelper(
              { party_name: data.party_name, party_phone_number: data.party_phone_number },
              'BROKER'
            );
            data.account_id = newAccountResult.account_id;
          }
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
          insurance_doc: uploadDocs?.[2]?.file_id ?? null,
          proof_doc: uploadDocs?.[1]?.file_id ?? null,
          date_of_purchase: data.date_of_purchase,
          registration_number: data.registration_number,
        };

        const purchaseResult = await accountsQueries.findAccount('Purchase');
        const cashResult = await accountsQueries.findAccount('Cash');
        if (purchaseResult && cashResult && brandID) {
          const addInventoryresult = await inventoryQueries.addVehicle(insertInventoryData, {
            transaction: dbTransaction,
          });

          if (data.is_delivery) {
            if (data.delivery_service_phone_number) {
              if (data.delivery_name) {
                const newAccountResult = await accountsService.accountHelper(
                  { party_name: data.delivery_name, party_phone_number: data.delivery_service_phone_number },
                  E_ACCOUNT_CATEGORIES.DELIVERY_SERVICE
                );

                data.delivery_service = newAccountResult.account_id;
              }
            }
            const directExpense = await accountsQueries.findAccount(E_LEDGERS_BASIC.DIRECT_EXPENSE);
            const expenseVoucher = await getVoucher('Expense');
            const deliveryTransaction: ITransactionParams[] = [];
            const dsTransactions: IDsTransactionAttributes[] = [];

            if (directExpense) {
              deliveryTransaction.push({
                amount: data.delivery_amount,
                credit_account: data.delivery_service,
                debit_account: directExpense,
                voucher_id: expenseVoucher,
                transaction_date: data.date_of_purchase,
                description: '',
              });

              if (addInventoryresult?.inventory_id) {
                dsTransactions.push({
                  ds_id: data.delivery_service,
                  vehicle_id: addInventoryresult.inventory_id,
                  transaction_id: 0,
                });
              }
              console.log(deliveryTransaction, 'TRANSCA');
              const resultTransaction = await accountsQueries.generateTransaction(deliveryTransaction, {
                transaction: dbTransaction,
              });

              dsTransactions.forEach((item, index) => {
                dsTransactions[index].transaction_id = resultTransaction[index].transaction_id;
              });

              await inventoryQueries.addTodeliveryServiceTable(dsTransactions, { transaction: dbTransaction });
            } else {
              throw new Error('Delivery Expense Is not Found Try again...');
            }
          }

          await accountsQueries.generateTransaction(
            [
              {
                amount: data.purchase_rate,
                credit_account: data.account_id,
                debit_account: purchaseResult,
                voucher_id: await getVoucher(E_VOUCHERS.Purchase),
                transaction_date: data.date_of_purchase,
                description: '',
              },
              {
                amount: data.purchase_amount,
                credit_account: cashResult,
                debit_account: data.account_id,
                voucher_id: await getVoucher(E_VOUCHERS.Payments),
                transaction_date: data.date_of_purchase,
                description: '',
              },
            ],
            { transaction: dbTransaction }
          );
          await performTransaction(dbTransaction);
        }

        return resolve({ message: 'Vehicle Added Successfully' });
      } catch (error) {
        console.log(error, 'EROR');
        reject({ message: 'Failed to add Vehicle to inventory...' + error });
      }
    });
  };

  assignVehiclesToFinance(body: IassignVehicle[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const transactions: ITransactionParams[] = [];
        const dbTransaction = await db.transaction();
        const financerDetails: IFinancerTransactionAttributes[] = [];
        const customerVoucher = await getVoucher(E_VOUCHERS.Reciept);
        const financerVoucher = await getVoucher(E_VOUCHERS.Reciept); // will change later

        await Promise.all(
          body.map(async (items) => {
            const [Vehicle, cash] = await Promise.all([
              inventoryQueries.findVehicle(items?.regNum),
              accountsQueries.findAccount('Cash'),
            ]);

            if (Vehicle && Vehicle.account_id && items.financerId && Vehicle.inventory_id) {

              transactions.push({
                amount: items.amount,
                credit_account: Vehicle.account_id,
                debit_account: items.financerId,
                voucher_id: customerVoucher,
                transaction_date: new Date(),
              });
              financerDetails.push({
                financer_id: items.financerId,
                vehicle_id: Vehicle?.inventory_id,
                transaction_id: 0, // not initialised
              });
            } else {
              throw new Error('vehicle Reg no or financer is not valid');
            }
            if (Vehicle && items.financerId && cash) {
              transactions.push({
                amount: items.amount,
                credit_account: items.financerId,
                debit_account: cash,
                voucher_id: financerVoucher,
                transaction_date: new Date(),
              });
            }
          })
        );



        const TransactionResult = await accountsQueries.generateTransaction(transactions, {
          transaction: dbTransaction,
        });

        console.log(TransactionResult, 'Transaction Result');

        financerDetails.forEach((item, index) => {
     
          financerDetails[index].transaction_id = TransactionResult[1].transaction_id;
        });

        await inventoryQueries.addTofinanceTable(financerDetails, { transaction: dbTransaction });

        await performTransaction(dbTransaction);

        return resolve({
          message: 'Vehicle assigned to Financer',
        });
      } catch (error) {
        console.log('BUG:', error);
        reject(new Error('Failed to generate transaction when assign vehicle to financer'));
      }
    });
  }

  assignVehiclesToDeliveryService(body: IassignVehicle[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const expenseVoucher = await getVoucher('Expense');
        const transactions: ITransactionParams[] = [];
        const dsTransactions: IDsTransactionAttributes[] = [];
        const dbTransaction = await db.transaction();

        const directExpense = await accountsQueries.findAccount(E_LEDGERS_BASIC.DIRECT_EXPENSE);
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
                voucher_id: expenseVoucher,
                transaction_date: new Date(),
              });

              if (vehicle?.inventory_id) {
                dsTransactions.push({
                  ds_id: item.serviceId,
                  vehicle_id: vehicle.inventory_id,
                  transaction_id: 0,
                });
              }
            }
          })
        );

        const resultTransaction = await accountsQueries.generateTransaction(transactions, {
          transaction: dbTransaction,
        });

        dsTransactions.forEach((item, index) => {
          dsTransactions[index].transaction_id = resultTransaction[index].transaction_id;
        });

        const result = await inventoryQueries.addTodeliveryServiceTable(dsTransactions, { transaction: dbTransaction });

        await performTransaction(dbTransaction);

        return resolve({ message: 'Vehicle assigned to Delivery Service Shop' });
      } catch (error) {
        console.log(error);
        reject({ message: `${error}: Failed to generate transaction when assigning vehicle to delivery Service` });
      }
    });
  }

  assignVehiclesToService(body: IassignVehicle[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbTransaction = await db.transaction();
        const transactions: ITransactionParams[] = [];
        const expenseVoucher = await getVoucher('Expense');
        const serviceTransaction: IServiceTransactionAttributes[] = [];
        const directExpense = await accountsQueries.findAccount('Direct Expense');
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
                voucher_id: expenseVoucher,
                transaction_date: new Date(),
              });

              if (vehicle?.inventory_id) {
                serviceTransaction.push({
                  vehicle_id: vehicle?.inventory_id,
                  service_shop_id: item.serviceId,
                  transaction_id: 0,
                });
              } else {
                throw new Error('Vehicle Registration Number is invalid');
              }
            } else {
              throw new Error('Invalid service center');
            }
          })
        );

        const generateResult = await accountsQueries.generateTransaction(transactions, { transaction: dbTransaction });
        console.log(generateResult, 'GENERATED RESUKT');
        serviceTransaction.forEach((item, index) => {
          serviceTransaction[index].transaction_id = generateResult[index].transaction_id;
        });
        await inventoryQueries.addToServiceTable(serviceTransaction, {
          transaction: dbTransaction,
        });

        await performTransaction(dbTransaction);
        return resolve({
          message: 'Vehicle assigned to service Shop',
        });
      } catch (error) {
        console.log(error);
        reject({ message: 'Failed to generate transaction when assigning vehicle to service shop' + error });
      }
    });
  }

  sellVehicle(data: IsellVehicleBody) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbTransaction = await db.transaction();
        const salesId = await accountsQueries.findAccount(E_LEDGERS_BASIC.SALE);
        const cashId = await accountsQueries.findAccount(E_LEDGERS_BASIC.CASH);

        if (data.customerPhoneNumber && data?.customerPhoneNumber?.length > 0) {
          if (data.customerName) {
            const newAccountResult = await accountsService.accountHelper(
              { party_name: data.customerName, party_phone_number: data.customerPhoneNumber },
              'CUSTOMER'
            );
            data.account_id = newAccountResult.account_id;
          }
        }
        
        let transactions: ITransactionParams[] = [];

        if (salesId && cashId) {
          transactions = [
            {
              amount: data.sales_rate,
              credit_account: salesId,
              debit_account: data.account_id,
              voucher_id: await getVoucher(E_VOUCHERS.Sale),
              description: '',
              transaction_date: data.sales_date,
            },
            {
              amount: data.rate,
              credit_account: data.account_id,
              debit_account: cashId,
              voucher_id: await getVoucher(E_VOUCHERS.Sale),
              description: '',
              transaction_date: data.sales_date,
            },
          ];
        }

        await accountsQueries.generateTransaction(transactions, { transaction: dbTransaction });
        await inventoryQueries.changeStatusOfVehicle(data.sold_vehicle_id, data.sales_rate, {
          transaction: dbTransaction,
        });
        const salesData = {
          account_id: data.account_id,
          sold_date: data.sales_date,
          due_date: data.due_date,
          exchange_vehicle_id: data.exchange_vehicle_id,
          sold_rate: data.sales_rate,
          sold_vehicle: data.sold_vehicle_id,
          payment_mode: data.payment_mode,
          is_finance: data.is_finance,
          finance_amount: data.finance_amount,
          finance_service_charge: data.finance_charge,
          is_exchange: data.is_exchange,
        };
        if (!data.is_finance) {
          delete salesData.finance_amount;
          delete salesData.finance_service_charge;
        }
        if (!data.is_exchange) {
          delete salesData.exchange_vehicle_id;
        }

        await inventoryQueries.addDatatoSales(salesData, { transaction: dbTransaction });

        await performTransaction(dbTransaction);

        resolve({
          message: 'vehicle sale success',
        });
      } catch (error) {
        reject({ message: `Failed to sell vehicle Error: ${error}` });
      }
    });
  }

  listVehicles(page: number, perPage: number) {
    console.log(page, perPage, 'list');
    return new Promise(async (resolve, reject) => {
      try {
        const options: FindOptions = {
          where: {
            sale_status: false,
          },
          include: [
            {
              model: Accounts,
              required: false,
              attributes: ['name', 'contact_info', 'head'],
            },
          ],
          attributes: [
            'inventory_id',
            'account_id',
            'brand_model_id',
            'ownership_name',
            'insurance_date',
            'date_of_purchase',
            'registration_number',
            'rc_book',
            'insurance_doc',
            'proof_doc',
          ],
          limit: perPage,
          offset: (page - 1) * perPage,
        };
        const vehicles = await inventoryQueries.getAllVehicles(options);
        vehicles.meta.perPage = perPage;
        return resolve(vehicles);
      } catch (err) {
        reject({ message: `Failed to List vehicles: ${err}` });
      }
    });
  }

  listVehicleRegNumber(isSold:boolean) {
    return new Promise(async (resolve, reject) => {
      try {

let query = ''
if(!isSold){
   query = `
  SELECT DISTINCT i.inventory_id, i.registration_number
  FROM inventory i
  LEFT JOIN sale_return sr ON i.inventory_id = sr.inventory_id AND sr.sale_status = false
  WHERE i.sale_status = false 
     OR (i.sale_status = true AND sr.inventory_id IS NOT NULL AND sr.sale_status = false);
`;
}else if(isSold){
  query =  `SELECT i.inventory_id, i.registration_number FROM inventory i WHERE i.sale_status = true `
}


        

        const options: FindOptions = {
          where: {},
          raw: true,
        };

        const vehicles = await inventoryQueries.getVehicleRegNo(options,query);

        return resolve(vehicles);
      } catch (err) {
        reject({ message: `Failed to List vehicles: ${err}` });
      }
    });
  }

  exchangeVehicle(data: IInventoryBody) {
    return new Promise(async (resolve, reject) => {
      try {
        const purchaseResult = await accountsQueries.findAccount('Purchase');
        const cashResult = await accountsQueries.findAccount('Cash');
        const purchaseVoucher = await getVoucher(E_VOUCHERS.Purchase);
        const paymentVoucher = await getVoucher(E_VOUCHERS.Payments);
        const dbTransaction = await db.transaction();
        const allowedExtension = ['pdf', 'jpg', 'jpeg', 'png'];
        const fileType = 'doc';
        let addInventoryresult;
        let SaleReturnResult;
        console.log(data.is_sales_return, 'SALES RETURN');
        if (data.is_sales_return) {
          console.log('entering.... sales return', data);
          const generatedTransaction: ITransactionParams[] = [];
          SaleReturnResult = await inventoryQueries.addDataInToSalesReturn(
            {
              inventory_id: data.inventory_id,
              sale_status: false,
              purchase_rate: data.purchase_rate,
              date_of_purchase: data.date_of_purchase,
            },
            { transaction: dbTransaction }
          );
          console.log(SaleReturnResult, 'RESULTTT');
          if (purchaseResult && cashResult) {
            generatedTransaction.push(
              {
                amount: data.purchase_rate || 0,
                credit_account: data.account_id,
                debit_account: purchaseResult,
                voucher_id: purchaseVoucher,
                description: '',
                transaction_date: data.date_of_purchase,
              },
              {
                amount: data.purchase_rate || 0,
                credit_account: cashResult,
                debit_account: data.account_id,
                description: '',
                voucher_id: paymentVoucher,
                transaction_date: data.date_of_purchase,
              }
            );
          }

          await accountsQueries.generateTransaction(generatedTransaction, {
            transaction: dbTransaction,
          });

          await performTransaction(dbTransaction);
          return resolve({ message: 'exchanged sales return Vehicle', data: SaleReturnResult });
        } else {
          const docs = [data.rc_book, data.proof_doc, data.insurance_doc];
          console.log(docs, 'THE DC');
          const dbTransaction = await db.transaction();

          const docsResult: any = await Promise.all(docs.map((file) => uploadFile(file, fileType, allowedExtension)));
          console.log(docsResult, 'Doc result');
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

          if (data.party_phone_number && data?.party_phone_number?.length > 0) {
            if (data.party_name) {
              const newAccountResult = await accountsService.accountHelper(
                { party_name: data.party_name, party_phone_number: data.party_phone_number },
                'CUSTOMER'
              );
              data.account_id = newAccountResult.account_id;
            }
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
            insurance_doc: uploadDocs?.[2]?.file_id ?? null,
            proof_doc: uploadDocs?.[1]?.file_id ?? null,
            date_of_purchase: data.date_of_purchase,
            registration_number: data.registration_number,
          };

          if (purchaseResult && cashResult && brandID) {
            addInventoryresult = await inventoryQueries.addVehicle(insertInventoryData, {
              transaction: dbTransaction,
            });

            console.log(addInventoryresult, 'RESULTTT');

            if (data.is_delivery) {
              const directExpense = await accountsQueries.findAccount(E_LEDGERS_BASIC.DIRECT_EXPENSE);
              const expenseVoucher = await getVoucher('Expense');
              const deliveryTransaction: ITransactionParams[] = [];
              const dsTransactions: IDsTransactionAttributes[] = [];

              if (data.delivery_service_phone_number) {
                if (data.delivery_name) {
                  const newAccountResult = await accountsService.accountHelper(
                    { party_name: data.delivery_name, party_phone_number: data.delivery_service_phone_number },
                    E_ACCOUNT_CATEGORIES.DELIVERY_SERVICE
                  );

                  data.delivery_service = newAccountResult.account_id;
                }
              }

              if (directExpense) {
                deliveryTransaction.push({
                  amount: data.delivery_amount,
                  credit_account: data.delivery_service,
                  debit_account: directExpense,
                  voucher_id: expenseVoucher,
                  description: '',
                  transaction_date: data.date_of_purchase,
                });

                if (addInventoryresult?.inventory_id) {
                  dsTransactions.push({
                    ds_id: data.delivery_service,
                    vehicle_id: addInventoryresult.inventory_id,
                    transaction_id: 0,
                  });
                }
                console.log(deliveryTransaction, 'TRANSCA');
                const resultTransaction = await accountsQueries.generateTransaction(deliveryTransaction, {
                  transaction: dbTransaction,
                });

                dsTransactions.forEach((item, index) => {
                  dsTransactions[index].transaction_id = resultTransaction[index].transaction_id;
                });
                console.log(dsTransactions, deliveryTransaction, 'DATA');
                await inventoryQueries.addTodeliveryServiceTable(dsTransactions, { transaction: dbTransaction });
              } else {
                throw new Error('Delivery Expense Is not Found Try again...');
              }
            }
            await accountsQueries.generateTransaction(
              [
                {
                  amount: data.purchase_rate,
                  credit_account: data.account_id,
                  debit_account: purchaseResult,
                  voucher_id: purchaseVoucher,
                  transaction_date: data.date_of_purchase,
                },
                {
                  amount: data.purchase_amount,
                  credit_account: cashResult,
                  debit_account: data.account_id,
                  voucher_id: paymentVoucher,
                  transaction_date: data.date_of_purchase,
                },
              ],
              { transaction: dbTransaction }
            );
            await performTransaction(dbTransaction);
          }

          return resolve({ message: 'Vehicle Added Successfully for exchange', data: addInventoryresult });
        }
      } catch (error) {
        console.log(error, 'EROR');
        reject({ message: `Failed to Exchange Vehicle ${error}` });
      }
    });
  }

  listBrandModel() {
    return new Promise(async (resolve, reject) => {
      try {
        const Brands = await inventoryQueries.listBrandModel();

        return resolve(Brands);
      } catch (err) {
        reject({ message: `Failed to List Brands: ${err}` });
      }
    });
  }

  editGetApi(inventoryId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const editGetApi = await inventoryQueries.getVehiclebyId(inventoryId);

        return resolve(editGetApi);
      } catch (err) {
        reject({ message: `Failed to List Brands: ${err}` });
      }
    });
  }
}

export default new InventoryService();
