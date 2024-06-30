import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
  
  // Define the interface for model attributes
  interface ReceiptAttributes {
    receipt_id: number;
    recipient_id: number;
    date: Date;
    description: string;
    mode: string;
    transaction_id: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface ReceiptCreationAttributes extends Optional<ReceiptAttributes, 'receipt_id'> {}
  
  class Receipt extends Model<ReceiptAttributes, ReceiptCreationAttributes> implements ReceiptAttributes {
    public receipt_id!: number;
    public recipient_id!: number;
    public date!: Date;
    public description!: string;
    public mode!: string;
    public transaction_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Receipt.init({
    receipt_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    recipient_id: {
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
    tableName: 'receipts',
    timestamps: true
  });
  
  export default Receipt;
  