import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
  
  // Define the interface for model attributes
  interface PaymentAttributes {
    payment_id: number;
    payee_id: number;
    date: Date;
    description: string;
    mode: string;
    transaction_id: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'payment_id'> {}
  
  class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
    public payment_id!: number;
    public payee_id!: number;
    public date!: Date;
    public description!: string;
    public mode!: string;
    public transaction_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Payment.init({
    payment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    payee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['cash', 'bank']]
      }
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
    tableName: 'payments',
    timestamps: true
  });
  
  export default Payment;
  