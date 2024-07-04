import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
import { ISalesAttributes } from '../types/db.type';
  
  // Define the interface for model attributes
 
  
  interface SalesCreationAttributes extends Optional<ISalesAttributes, 'sales_id'> {}
  
  class Sales extends Model<ISalesAttributes, SalesCreationAttributes> implements ISalesAttributes {
    public sales_id!: number;
    public account_id!: number;
    public sold_vehicle!: number;
    public sold_rate!: number;
    public sold_date!: Date;
    public payment_mode!: string;
    public is_finance!: boolean;
    public finance_amount!: number;
    public finance_service_charge!: number;
    public is_exchange!: number;
    public exchange_vehicle_id!: number;
    public due_date!: Date;
  
  }
  
  Sales.init({
    sales_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sold_vehicle: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sold_rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sold_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    payment_mode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_finance: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    finance_amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    finance_service_charge: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_exchange: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exchange_vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize: db,
    tableName: 'sales',
    timestamps: true
  });
  
  export default Sales;
  