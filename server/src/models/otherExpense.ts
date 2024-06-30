import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
  
  // Define the interface for model attributes
  interface OtherExpenseAttributes {
    ot_expense_id: number;
    due_date: Date;
    transaction_id: number;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface OtherExpenseCreationAttributes extends Optional<OtherExpenseAttributes, 'ot_expense_id'> {}
  
  class OtherExpense extends Model<OtherExpenseAttributes, OtherExpenseCreationAttributes> implements OtherExpenseAttributes {
    public ot_expense_id!: number;
    public due_date!: Date;
    public transaction_id!: number;
    public amount!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  OtherExpense.init({
    ot_expense_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
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
    tableName: 'other_expenses',
    timestamps: true
  });
  
  export default OtherExpense;
  