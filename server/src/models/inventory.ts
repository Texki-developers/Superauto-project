import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
  
  // Define the interface for model attributes
  interface InventoryAttributes {
    inventory_id: number;
    brand_model_id: number;
    year_of_manufacture: number;
    ownership_name: string;
    purchase_rate: number;
    insurance_date: string | null;
    sale_status: boolean;
    rc_book: string | null;
    insurance_doc: string | null;
    proof_doc: string | null;
    date_of_purchase: string | null;
    sold_price: number | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface InventoryCreationAttributes extends Optional<InventoryAttributes, 'inventory_id' | 'insurance_date' | 'rc_book' | 'insurance_doc' | 'proof_doc' | 'date_of_purchase' | 'sold_price'> {}
  
  class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
    public inventory_id!: number;
    public brand_model_id!: number;
    public year_of_manufacture!: number;
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
  
  Inventory.init({
    inventory_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    brand_model_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year_of_manufacture: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ownership_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    purchase_rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    insurance_date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sale_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    rc_book: {
      type: DataTypes.STRING,
      allowNull: true
    },
    insurance_doc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    proof_doc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_of_purchase: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sold_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize: db,
    tableName: 'inventory',
    timestamps: true
  });
  
  export default Inventory;
  