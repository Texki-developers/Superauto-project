import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
import { IFinancerTransactionAttributes } from '../types/db.type';
import Transaction from './transaction';
  
  // Define the interface for model attributes

  
  interface FinancerTransactionCreationAttributes extends Optional<IFinancerTransactionAttributes, 'financer_transaction_id'> {}
  
  class FinancerTransaction extends Model<IFinancerTransactionAttributes, FinancerTransactionCreationAttributes> implements IFinancerTransactionAttributes {
    public financer_transaction_id!: number;
    public financer_id!: number;
    public vehicle_id!: number;
    public transaction_id!: number;
   
  }
  
  FinancerTransaction.init({
    financer_transaction_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    financer_id: {
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
    tableName: 'financer_transactions',
    timestamps: true
  });
  
  export default FinancerTransaction;
  