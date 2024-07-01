import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
  
  // Define the interface for model attributes
  interface TransactionAttributes {
    transaction_id?: number;
    description?: string;
    amount: number;
    credit_account: number;
    debit_account: number;
    voucher_id?: string;
  }
  
  interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'transaction_id'> {}
  
  class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
    public transaction_id!: number;
    public description!: string;
    public amount!: number;
    public credit_account!: number;
    public debit_account!: number;
    public voucher_id!: string;
   
  }
  
  Transaction.init({
    transaction_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    credit_account: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    debit_account: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    voucher_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize: db,
    tableName: 'transactions',
    timestamps: true
  });
  
  export default Transaction;
  