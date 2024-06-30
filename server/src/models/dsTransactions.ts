import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
  
  // Define the interface for model attributes
  interface DsTransactionAttributes {
    ds_txn_id: number;
    ds_id: number;
    vehicle_id: number;
    transaction_id: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface DsTransactionCreationAttributes extends Optional<DsTransactionAttributes, 'ds_txn_id'> {}
  
  class DsTransaction extends Model<DsTransactionAttributes, DsTransactionCreationAttributes> implements DsTransactionAttributes {
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
    tableName: 'ds_transactions',
    timestamps: true
  });
  
  export default DsTransaction;
  