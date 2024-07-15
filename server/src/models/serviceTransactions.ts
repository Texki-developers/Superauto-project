import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
import { IServiceTransactionAttributes } from '../types/db.type';
import Transaction from './transaction';
  
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
    },
    transaction_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:Transaction,
        key: 'transaction_id'
      }
    }
  }, {
    sequelize: db,
    tableName: 'service_transactions',
    timestamps: true
  });
  
  export default ServiceTransaction;
  