import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../config/database';
import { IInventoryAttributes } from '../types/db.type';
import Accounts from './accounts';

// Define the interface for model attributes

interface InventoryCreationAttributes
  extends Optional<
    IInventoryAttributes,
    'inventory_id' | 'insurance_date' | 'rc_book' | 'insurance_doc' | 'proof_doc' | 'date_of_purchase' | 'sold_price'
  > {}

class Inventory extends Model<IInventoryAttributes, InventoryCreationAttributes> implements IInventoryAttributes {
  public inventory_id!: number;
  public account_id?: number | undefined;
  public brand_model_id!: number;
  public year_of_manufacture!: number;
  public registration_number!: string;
  public ownership_name!: string;
  public purchase_rate!: number;
  public insurance_date!: string | null;
  public sale_status!: boolean;
  public rc_book!: string | null;
  public insurance_doc!: string | null;
  public proof_doc!: string | null;
  public date_of_purchase!: string | null;
  public sold_price!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      allowNull: false,
      references: {
        model: Accounts,
        key: 'account_id',
      },
    },
    brand_model_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year_of_manufacture: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownership_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchase_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    insurance_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    registration_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sale_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    rc_book: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    insurance_doc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    proof_doc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_of_purchase: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sold_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    tableName: 'inventory',
    timestamps: true,
  }
);

export default Inventory;
