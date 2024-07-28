import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../config/database';
import { IInventoryAttributes } from '../types/db.type';
import Accounts from './accounts';
import BrandModel from './brand';
import FileStore from './documents';
import SaleReturn from './salesReturn';
import DsTransaction from './dsTransactions';
import Transaction from './transaction';

// Define the interface for model attributes

interface InventoryCreationAttributes
  extends Optional<
    IInventoryAttributes,
    'inventory_id' | 'insurance_date' | 'rc_book' | 'insurance_doc' | 'proof_doc' | 'date_of_purchase' | 'sold_price'
  > {}

class Inventory extends Model<IInventoryAttributes, InventoryCreationAttributes> implements IInventoryAttributes {
  public inventory_id!: number;
  public account_id!: number ;
  public brand_model_id!: number;
  public year_of_manufacture!: number;
  public registration_number!: string;
  public ownership_name!: string;
  public purchase_rate!: number;
  public insurance_date!: string | null;
  public sale_status!: boolean;
  public rc_book!: number | null;
  public insurance_doc!: number | null;
  public proof_doc!: number | null;
  public date_of_purchase!: Date;
  public sold_price!: number | null;
  public initial_amount!: number

}

Inventory.init(
  {
    inventory_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Accounts,
        key: 'account_id',
      },
    },
    brand_model_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BrandModel,
        key: 'brand_model_id',
      },
    },
    year_of_manufacture: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownership_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    purchase_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    insurance_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    registration_number: {
      unique:true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    sale_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    rc_book: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model:FileStore,
        key:'file_id'
      }
    },
    insurance_doc: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model:FileStore,
        key:'file_id'
      }
    },
    proof_doc: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model:FileStore,
        key:'file_id'
      }
    },
    date_of_purchase: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    initial_amount:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    delivery_amount:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sold_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize: db,
    tableName: 'inventory',
    timestamps: true,
  }

);

Inventory.belongsTo(Accounts, { foreignKey: 'account_id' });
Inventory.belongsTo(BrandModel, { foreignKey: 'brand_model_id' });
Inventory.belongsTo(FileStore, { as: 'rcBook', foreignKey: 'rc_book' });
Inventory.belongsTo(FileStore, { as: 'insuranceDoc', foreignKey: 'insurance_doc' });
Inventory.belongsTo(FileStore, { as: 'proofDoc', foreignKey: 'proof_doc' });
Inventory.hasOne(DsTransaction,{foreignKey:'vehicle_id'})
Inventory.hasOne(SaleReturn, {  foreignKey: 'inventory_id' });
export default Inventory;