import { FindOptions, QueryTypes } from 'sequelize';
import BrandModel from '../../../models/brand';
import FileStore from '../../../models/documents';
import DsTransaction from '../../../models/dsTransactions';
import FinancerTransaction from '../../../models/financeTransactions';
import Inventory from '../../../models/inventory';
import Sales from '../../../models/sales';
import ServiceTransaction from '../../../models/serviceTransactions';
import {
  IDsTransactionAttributes,
  IFinancerTransactionAttributes,
  IInventoryAttributes,
  ISalesAttributes,
  IServiceTransactionAttributes,
  ITransactionParams,
} from '../../../types/db.type';
import SaleReturn from '../../../models/salesReturn';
import { db } from '../../../config/database';
import TransactionConnectors from '../../../models/transactionConnecter';

class InventoryQueries {
  async addVehicle(data: IInventoryAttributes, options?: any): Promise<IInventoryAttributes> {
    const result = await Inventory.create(data, { returning: true, ...options });

    if (result && result.dataValues) {
      return result.dataValues as IInventoryAttributes;
    } else {
      throw new Error('Failed to create vehicle');
    }
  }

  async uploadManyDocs(docs: { location: string; name: string }[]) {
    return await FileStore.bulkCreate(docs);
  }

  async uploadBrandModel(brand: string, model: string) {
    return await BrandModel.create({
      brand: brand,
      model: model,
    });
  }

  async findVehicle(regNum: string) {
    const result = await Inventory.findOne({
      where: {
        registration_number: regNum,
      },
    });

    return result?.dataValues;
  }

  async addTofinanceTable(data: IFinancerTransactionAttributes[], options?: any) {
    try {
      const financeResult = await FinancerTransaction.bulkCreate(data, options);
      return financeResult;
    } catch (error) {
      throw new Error('Failed To Generate Transaction');
    }
  }

  async addTodeliveryServiceTable(data: IDsTransactionAttributes[], options?: any) {
    try {
      const deliveryService = await DsTransaction.bulkCreate(data, {...options,updateOnDuplicate:['ds_id','vehicle_id']});
      return deliveryService;
    } catch (error) {
      throw new Error('Failed To Generate Transaction');
    }
  }

  async addToServiceTable(data: IServiceTransactionAttributes[], options?: any) {
    try {
      const Service = await ServiceTransaction.bulkCreate(data, options);
      return Service;
    } catch (error) {
      throw new Error('Failed To Generate Transaction');
    }
  }

  async changeStatusOfVehicle(soldVehicleId: number, soldPrice: number, options?: any) {
    return await Inventory.update(
      { sale_status: true, sold_price: soldPrice },
      {
        where: {
          inventory_id: soldVehicleId,
        },
        returning: true,
        ...options,
      }
    );
  }

  async addDatatoSales(data: ISalesAttributes, options?: any) {
    return await Sales.create(data, options);
  }

  async getAllVehicles(options?: FindOptions) {
    const { rows: accounts, count: totalCount } = await Inventory.findAndCountAll(options);
    const result = {
      accounts: accounts,
      meta: {
        totalCount: totalCount,
        perPage: accounts.length,
      },
    };
    return result;
  }

  async getVehicleRegNo(options: FindOptions, query: string) {
    // Set the `replacements` property to include a custom SQL query and options.
    const [vehicles] = await db.query(query, options);
    console.log(vehicles);
    return vehicles;
  }
  async addDataInToSalesReturn(data: any, options?: any) {
    return await SaleReturn.create(data, options);
  }

  async listBrandModel() {
    return await BrandModel.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async getSalesReturn(options: FindOptions) {
    return await SaleReturn.findAll(options);
  }

  async getVehiclebyId(inventory_id: number) {
    return await Inventory.findOne({
      where: {
        inventory_id: inventory_id,
      },
      include: [
        // {
        //   model: Accounts,
        //   required: false,
        //   attributes: ['name', 'contact_info', 'head'],
        // },
        {
          model: BrandModel,
          required: false,
          attributes: ['brand', 'model'],
        },
        { model: FileStore, as: 'rcBook', attributes: ['file_id', 'name', 'location'] },
        { model: FileStore, as: 'insuranceDoc', attributes: ['file_id', 'name', 'location'] },
        { model: FileStore, as: 'proofDoc', attributes: ['file_id', 'name', 'location'] },
      ],
      attributes: [
        'inventory_id',
        'account_id',
        'brand_model_id',
        'ownership_name',
        'insurance_date',
        'date_of_purchase',
        'purchase_rate',
        'year_of_manufacture',
      ],
    });
  }

  async getVehicleMrp(vehicle_id: number) {
    const query = `
    SELECT 
    (i.purchase_rate + SUM(t.amount)) AS MRP
FROM 
    inventory i
LEFT JOIN 
    ds_transactions ds ON i.inventory_id = ds.vehicle_id
LEFT JOIN 
    service_transactions st ON i.inventory_id = st.vehicle_id
LEFT JOIN 
    transactions t ON ds.transaction_id = t.transaction_id OR st.transaction_id = t.transaction_id
WHERE 
    i.inventory_id = :vehicle_id
GROUP BY 
    i.purchase_rate;`;
    const [mrp] = await db.query(query, {
      replacements: { vehicle_id },
      type: QueryTypes.RAW,
    });

    return mrp[0]
  }

  async insertBulkTsConnectors(data:any,options:any) {
    return await TransactionConnectors.bulkCreate(data, options);
  }

  async getTransactionConnectors(data:any) {
    return await TransactionConnectors.findAll({
      where:{
        entity_id:data.entity_id,
        entity_type:data.entity_type
      }
    });
  }

  async findVehicleDeliveryTransaction(query:FindOptions){
    return await DsTransaction.findAll(query)
  }

  async editVehicle(data:IInventoryAttributes,query:any){
      return await Inventory.update(data,query)
  }

  async findDs_Txn_id (id:number){
    return await DsTransaction.findOne({
      where:{
        transaction_id:id
      }
    })
  }
}

export default new InventoryQueries()
