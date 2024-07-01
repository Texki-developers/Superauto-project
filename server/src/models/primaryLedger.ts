import {
  DataTypes,
  Model,
  Optional
} from 'sequelize';
import { db } from '../config/database';

interface PrimaryLedgerAttributes {
  pl_id: number;
  ledger_name: string;
  type: string;
}

interface PrimaryLedgerCreationAttributes extends Optional<PrimaryLedgerAttributes, 'pl_id'> {}

class PrimaryLedger extends Model<PrimaryLedgerAttributes, PrimaryLedgerCreationAttributes> implements PrimaryLedgerAttributes {
  public pl_id!: number;
  public ledger_name!: string;
  public type!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PrimaryLedger.init({
  pl_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ledger_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'primary_ledger',
  timestamps: true
});

export default PrimaryLedger;
