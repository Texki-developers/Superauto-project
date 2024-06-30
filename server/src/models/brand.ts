import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
  
  // Define the interface for model attributes
  interface BrandModelAttributes {
    brand_model_id: number;
    brand: string;
    model: string;
  }
  
  interface BrandModelCreationAttributes extends Optional<BrandModelAttributes, 'brand_model_id'> {}
  
  class BrandModel extends Model<BrandModelAttributes, BrandModelCreationAttributes> implements BrandModelAttributes {
    public brand_model_id!: number;
    public brand!: string;
    public model!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  BrandModel.init({
    brand_model_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize: db,
    tableName: 'brand_model',
    timestamps: true
  });
  
  export default BrandModel;
  