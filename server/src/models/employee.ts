import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
import Accounts from './accounts';
  
  interface EmployeeAttributes {
    employee_id: number;
    account_id: number;
    salary: number;
  }
  
  interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'employee_id'> {}
  
  class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
    public employee_id!: number;
    public account_id!: number;
    public salary!: number;
  }
  
  Employee.init({
    employee_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,

    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:Accounts,
        key:'account_id'
      }
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize: db,
    tableName: 'employees',
    timestamps: true
  });
  
  export default Employee;
  