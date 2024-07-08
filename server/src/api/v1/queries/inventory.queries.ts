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
import SaleReturn from '../../../models/salesReturn';
import { db } from '../../../config/database';

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

  async getVehicleRegNo(options: FindOptions) {
    const query = `
    SELECT DISTINCT i.inventory_id, i.registration_number
    FROM inventory i
    LEFT JOIN sale_return sr ON i.inventory_id = sr.inventory_id AND sr.sale_status = false
    WHERE i.sale_status = false 
       OR (i.sale_status = true AND sr.inventory_id IS NOT NULL AND sr.sale_status = false);
`;

    // Set the `replacements` property to include a custom SQL query and options.
    const [vehicles] = await db.query(query, options);
    console.log(vehicles)
    return vehicles
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
}

export default new InventoryQueries();
