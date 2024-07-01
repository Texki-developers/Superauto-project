import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
import { IServiceTransactionAttributes } from '../types/db.type';
  
  // Define the interface for model attributes

  
  interface ServiceTransactionCreationAttributes extends Optional<IServiceTransactionAttributes, 'service_txn_id'> {}
  
  class ServiceTransaction extends Model<IServiceTransactionAttributes, ServiceTransactionCreationAttributes> implements IServiceTransactionAttributes {
    public service_txn_id!: number;
    public service_shop_id!: number;
    public vehicle_id!: number;
    public transaction_id!: number;
 
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
    }
  }, {
    sequelize: db,
    tableName: 'service_transactions',
    timestamps: true
  });
  
  export default ServiceTransaction;
  