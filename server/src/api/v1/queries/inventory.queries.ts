import BrandModel from '../../../models/brand';
import FileStore from '../../../models/documents';
import DsTransaction from '../../../models/dsTransactions';
import Inventory from '../../../models/inventory';
import { IInventoryAttributes, ITransactionParams } from '../../../types/db.type';
import { IInventoryBody } from '../../../types/request.type';

class InventoryQueries {
  async addVehicle(data: IInventoryAttributes,options?:any) {
    return await Inventory.create(data,options);
  }

  async uploadManyDocs(docs: { location: string; name: string }[]) {
    return await FileStore.bulkCreate(docs);
  }

  async uploadBrandModel(brand: string, model: string) {
    return await BrandModel.create({
      brand,
      model,
    });
  }


  async findVehicle (regNum:string){
    return await Inventory.findOne({where:{
      registration_number:regNum
    }})
  }

  async generateFinanceTransaction (data:ITransactionParams[],options?:any){
    try{
      const TransactionResult  = await DsTransaction.bulkCreate(data,options)
      return TransactionResult
    }catch(error){
      throw new Error('Failed To Generate Transaction')
    }
}
}

export default new InventoryQueries();
