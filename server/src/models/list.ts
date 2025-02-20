import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface ListAttributes {
  id: number;
  name: string;
  assignedUserId?: number;
}

interface ListCreationAttributes extends Optional<ListAttributes, 'id'> {}

export class List extends Model<ListAttributes, ListCreationAttributes> implements ListAttributes {
  public id!: number;
  public name!: string;
  public assignedUserId!: number;

  // associated Volunteer model
  public readonly assignedUser?: User;
}

export function ListFactory(sequelize: Sequelize): typeof List {
  List.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'list',
      sequelize,
    }
  );

  return List;
}