import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
  
  // Define the interface for model attributes
  interface ServiceTransactionAttributes {
    service_txn_id: number;
    service_shop_id: number;
    vehicle_id: number;
    transaction_id: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface ServiceTransactionCreationAttributes extends Optional<ServiceTransactionAttributes, 'service_txn_id'> {}
  
  class ServiceTransaction extends Model<ServiceTransactionAttributes, ServiceTransactionCreationAttributes> implements ServiceTransactionAttributes {
    public service_txn_id!: number;
    public service_shop_id!: number;
    public vehicle_id!: number;
    public transaction_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  ServiceTransaction.init({
    service_txn_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    service_shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'service_transactions',
    timestamps: true
  });
  
  export default ServiceTransaction;
  