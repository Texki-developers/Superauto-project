import {
  DataTypes,
  Model,
  Optional
} from 'sequelize';
import {db} from '../config/database'
import PrimaryLedger from './primaryLedger';
import Employee from './employee';


// Define the interface for model attributes
interface AccountAttributes {
  account_id: number;
  name: string;
  contact_info: string;
  category: string;
  head: number;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'account_id'> {}

class Accounts extends Model<AccountAttributes, AccountCreationAttributes> {
  public account_id!: number;
  public name!: string;
  public contact_info!: string;
  public category!: string;
  public head!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Accounts.init({
  account_id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    references:{
      model:Employee,
      key:'account_id'
    }
  },
  name: {
    type: DataTypes.STRING
  },
  contact_info: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  head: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PrimaryLedger, 
      key: 'pl_id'
    }
  }
}, {
  sequelize: db,
  tableName: 'accounts',
  timestamps: true
});


export default Accounts