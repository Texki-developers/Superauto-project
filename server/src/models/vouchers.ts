import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
  
  // Define the interface for model attributes
  interface VoucherAttributes {
    voucher_id: number;
    voucher_name: string;
    last_invoice_number: number;
  }
  
  interface VoucherCreationAttributes extends Optional<VoucherAttributes, 'voucher_id'> {}
  
  class Voucher extends Model<VoucherAttributes, VoucherCreationAttributes> implements VoucherAttributes {
    public voucher_id!: number;
    public voucher_name!: string;
    public last_invoice_number!: number;
  }
  
  Voucher.init({
    voucher_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    voucher_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_invoice_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize: db,
    tableName: 'vouchers',
    timestamps: false
  });
  
  export default Voucher;
  