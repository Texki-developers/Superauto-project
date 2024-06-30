import {
    DataTypes,
    Model,
    Optional
  } from 'sequelize';
  import { db } from '../config/database';
  
  // Define the interface for model attributes
  interface FileAttributes {
    file_id?: number;
    name: string;
    location: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  interface FileCreationAttributes extends Optional<FileAttributes, 'file_id'> {}
  
  class FileStore extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
    public file_id!: number;
    public name!: string;
    public location!: string;
    public readonly createdAt!: string;
    public readonly updatedAt!: string;
  }
  
  FileStore.init({
    file_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize: db,
    tableName: 'files',
    timestamps: false
  });
  
  export default FileStore;
  