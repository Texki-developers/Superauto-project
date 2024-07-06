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
import SaleReturn from '../../../models/salesReturn';
import Accounts from '../../../models/accounts';

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

  async getAllVehicles(options?:any) {
    return await Inventory.findAll({...options,
      include:[
  
        {
          model: Accounts,
          required: false,
          attributes:  ['name', 'contact_info',"head"], 

          
        },
        {
          model:BrandModel,
          required:false,
          attributes: ["brand","model"]
        },
        { model: FileStore, as: 'rcBook', attributes: ['file_id', 'name'], },
      { model: FileStore, as: 'insuranceDoc', attributes: ['file_id', 'name'] },
      { model: FileStore, as: 'proofDoc', attributes: ['file_id', 'name'] },
      
    ],
    attributes: [
      "inventory_id","account_id","brand_model_id","ownership_name","insurance_date","date_of_purchase"
    ]
  });
  }

 async addDataInToSalesReturn (data:any,options?:any){

  return await SaleReturn.create(data,options)
 }


 async ListvehicleWithRegno  (options:any){
  return await Inventory.findAll(options)
 }

 async listBrandModel (){
    return await BrandModel.findAll({

      attributes:{
        exclude:["createdAt","updatedAt"]
      }
    })
 }
}

export default new InventoryQueries();
