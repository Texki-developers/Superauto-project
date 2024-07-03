import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
import Transaction from './transaction';
  
  // Define the interface for model attributes
  interface ReceiptAttributes {
    receipt_id: number;
    date: Date;
    description: string;
    transaction_id: number;
  }
  
  interface ReceiptCreationAttributes extends Optional<ReceiptAttributes, 'receipt_id'> {}
  
  class Receipt extends Model<ReceiptAttributes, ReceiptCreationAttributes> implements ReceiptAttributes {
    public receipt_id!: number;
    public date!: Date;
    public description!: string;
    public transaction_id!: number;
  }
  
  Receipt.init({
    receipt_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Transaction,
        key: 'transaction_id'
      }
    }
  }, {
    sequelize: db,
    tableName: 'receipts',
    timestamps: true
  });
  
  export default Receipt;
  