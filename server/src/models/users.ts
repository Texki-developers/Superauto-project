import { DataTypes, Model } from 'sequelize';
import { db } from '../config/database';
import messages from '../utils/constants/messages';

export class Users extends Model {
  public user_name!: string;
  public password!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: messages.error.USER_ALREADY_EXIST,
        name: 'SequelizeUniqueConstraintError',
      },
    },
  },
  {
    sequelize: db,
    tableName: 'user',
    timestamps: true,
  }
);
