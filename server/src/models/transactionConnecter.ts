import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
import Transaction from './transaction';
  
  // Define the interface for model attributes
  interface ITransactionConnectorsAttributes {
    connector_id: number;
    transaction_id: number;
    entity_id: number;
    entity_type: string;
  }
  
  // Define the interface for creation attributes
  interface TransactionConnectorsCreationAttributes extends Optional<ITransactionConnectorsAttributes, 'connector_id'> {}
  
  class TransactionConnectors extends Model<ITransactionConnectorsAttributes, TransactionConnectorsCreationAttributes> implements ITransactionConnectorsAttributes {
    public connector_id!: number;
    public transaction_id!: number;
    public entity_id!: number;
    public entity_type!: string;
  }
  
  TransactionConnectors.init({
    connector_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Transaction,
        key: 'transaction_id',
      },
    },
    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    entity_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['customer', 'service shop', 'etc']]
      }
    }
  }, {
    sequelize: db,
    tableName: 'transaction_connectors',
    timestamps: true
  });
  
  export default TransactionConnectors;
  