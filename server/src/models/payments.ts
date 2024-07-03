import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
import Transaction from './transaction';
  
  // Define the interface for model attributes
  interface PaymentAttributes {
    payment_id: number;
    date: Date;
    description: string;
    transaction_id: number;
 
  }
  
  interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'payment_id'> {}
  
  class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
    public payment_id!: number;
    public date!: Date;
    public description!: string;
    public transaction_id!: number;
  
  }
  
  Payment.init({
    payment_id: {
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
    tableName: 'payments',
    timestamps: true
  });
  
  export default Payment;
  