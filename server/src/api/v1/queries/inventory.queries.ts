import BrandModel from '../../../models/brand';
import FileStore from '../../../models/documents';
import Inventory from '../../../models/inventory';
import { IInventoryAttributes } from '../../../types/db.type';
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
}

export default new InventoryQueries();
