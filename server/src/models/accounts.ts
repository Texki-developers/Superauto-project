import { DataTypes, Model, Optional, } from 'sequelize';
import { db } from '../config/database';
import PrimaryLedger from './primaryLedger';
import { IAccountAttributes } from '../types/db.type';
import Employee from './employee';
import Transaction from './transaction';
interface AccountCreationAttributes extends Optional<IAccountAttributes, 'account_id'> {}

class Accounts extends Model<IAccountAttributes, AccountCreationAttributes> {
  public account_id!: number;
  public name!: string;
  public contact_info!: string;
  public category!: string;
  public head!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Accounts.init(
  {
    account_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique:true
    },
    contact_info: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    head: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PrimaryLedger,
        key: 'pl_id',
      },
    },
  },
  {
    sequelize: db,
    tableName: 'accounts',
    timestamps: true,
  }
);
Accounts.belongsTo(PrimaryLedger, { foreignKey: 'head' });
PrimaryLedger.hasMany(Accounts, { foreignKey: 'head' });
Accounts.hasOne(Employee,{foreignKey: 'account_id'})
export default Accounts;

