import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
import Transaction from './transaction';
  
  // Define the interface for model attributes
  interface OtherExpenseAttributes {
    ot_expense_id: number;
    due_date: Date;
    transaction_id: number;
    amount: number;
   
  }
  
  interface OtherExpenseCreationAttributes extends Optional<OtherExpenseAttributes, 'ot_expense_id'> {}
  
  class OtherExpense extends Model<OtherExpenseAttributes, OtherExpenseCreationAttributes> implements OtherExpenseAttributes {
    public ot_expense_id!: number;
    public due_date!: Date;
    public transaction_id!: number;
    public amount!: number;
 
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
      allowNull: false,
      references:{
        model: Transaction,
        key: 'transaction_id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize: db,
    tableName: 'other_expenses',
    timestamps: true
  });
  
  export default OtherExpense;
  