import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
import { ISaleReturnAttributes } from '../types/db.type';
import Inventory from './inventory';
import { AllowNull } from 'sequelize-typescript';
  
  // Define the interface for model attributes

  
  interface SaleReturnCreationAttributes extends Optional<ISaleReturnAttributes, 'sl_id'> {}
  
  class SaleReturn extends Model<ISaleReturnAttributes, SaleReturnCreationAttributes> implements ISaleReturnAttributes {
    public sl_id!: number;
    public inventory_id!: number;
    public sold_price!: number;
    public sale_status!: boolean;
    public purchase_rate!: number;
    public date_of_purchase !:Date;
  }
  
  SaleReturn.init({
    sl_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:Inventory,
        key:'inventory_id'
      }
    },
    sold_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sale_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    purchase_rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_of_purchase:{
      type: DataTypes.DATE,
      allowNull:false
    }
  }, {
    sequelize: db,
    tableName: 'sale_return',
    timestamps: true
  });
  
  export default SaleReturn;
  