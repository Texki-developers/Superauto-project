import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
  
  // Define the interface for model attributes
  interface FinancerTransactionAttributes {
    financer_transaction_id: number;
    financer_id: number;
    vehicle_id: number;
    transaction_id: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface FinancerTransactionCreationAttributes extends Optional<FinancerTransactionAttributes, 'financer_transaction_id'> {}
  
  class FinancerTransaction extends Model<FinancerTransactionAttributes, FinancerTransactionCreationAttributes> implements FinancerTransactionAttributes {
    public financer_transaction_id!: number;
    public financer_id!: number;
    public vehicle_id!: number;
    public transaction_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
    tableName: 'financer_transactions',
    timestamps: true
  });
  
  export default FinancerTransaction;
  