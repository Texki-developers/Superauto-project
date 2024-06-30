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
    prefix: string;
    createdAt?: Date;
    updateAt?: Date;
  }
  
  interface VoucherCreationAttributes extends Optional<VoucherAttributes, 'voucher_id'> {}
  
  class Voucher extends Model<VoucherAttributes, VoucherCreationAttributes> implements VoucherAttributes {
    public voucher_id!: number;
    public voucher_name!: string;
    public last_invoice_number!: number;
    public prefix!: string;
    public createdAt!: Date;
    public updateAt!: Date;
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
    prefix: {
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
    timestamps: true
  });
  
  export default Voucher;
  