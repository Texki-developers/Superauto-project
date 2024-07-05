import { FindOptions } from 'sequelize';
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
import { IInventoryBody } from '../../../types/request.type';
import returnDataValues from '../../../utils/commonUtils/returnDataValues';

class InventoryQueries {
  async addVehicle(data: IInventoryAttributes, options?: any):Promise<IInventoryAttributes> {
    const result = await Inventory.create(data, { returning: true, ...options })

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
      const deliveryService = await DsTransaction.bulkCreate(data, options);
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

  async changeStatusOfVehicle(soldVehicleId: number, options?: any) {
    return await Inventory.update(
      { sale_status: true },
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

  async getAllVehicles(options?:FindOptions) {
    return await Inventory.findAll(options);
  }

 async addDataInToSalesReturn (data:any,options?:any){

  return await Inventory.create(data,options)
 }

 async listBrandModel (){
    return await BrandModel.findAll()
 }
}

export default new InventoryQueries();
