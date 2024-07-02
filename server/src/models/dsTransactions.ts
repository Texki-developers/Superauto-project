import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
import { IDsTransactionAttributes } from '../types/db.type';
import Transaction from './transaction';
  
  // Define the interface for model attributes

  
  interface DsTransactionCreationAttributes extends Optional<IDsTransactionAttributes, 'ds_txn_id'> {}
  
  class DsTransaction extends Model<IDsTransactionAttributes, DsTransactionCreationAttributes> implements IDsTransactionAttributes {
    public ds_txn_id!: number;
    public ds_id!: number;
    public vehicle_id!: number;
    public transaction_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  DsTransaction.init({
    ds_txn_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ds_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:Transaction,
        key: 'transaction_id'
      }
    }
  }, {
    sequelize: db,
    tableName: 'ds_transactions',
    timestamps: true
  });
  
  export default DsTransaction;
  