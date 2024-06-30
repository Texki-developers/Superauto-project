import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
  
  // Define the interface for model attributes
  interface SalesAttributes {
    sales_id: number;
    account_id: number;
    sold_vehicle: number;
    sold_rate: number;
    sold_date: Date;
    payment_mode: string;
    is_finance: boolean;
    finance_amount: number | null;
    finance_service_charge: number | null;
    is_exchange: boolean;
    exchange_vehicle_id: number | null;
    due_date: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface SalesCreationAttributes extends Optional<SalesAttributes, 'sales_id' | 'finance_amount' | 'finance_service_charge' | 'exchange_vehicle_id' | 'due_date'> {}
  
  class Sales extends Model<SalesAttributes, SalesCreationAttributes> implements SalesAttributes {
    public sales_id!: number;
    public account_id!: number;
    public sold_vehicle!: number;
    public sold_rate!: number;
    public sold_date!: Date;
    public payment_mode!: string;
    public is_finance!: boolean;
    public finance_amount!: number | null;
    public finance_service_charge!: number | null;
    public is_exchange!: boolean;
    public exchange_vehicle_id!: number | null;
    public due_date!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    exchange_vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    due_date: {
      type: DataTypes.DATE,
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
    tableName: 'sales',
    timestamps: true
  });
  
  export default Sales;
  