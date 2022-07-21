import { CreatePersonDto } from './../../persons/dto/create-person.dto';
import { DataTypes, Model } from 'sequelize';
import db from '../config/config.database';

export class PersonsInstance extends Model<CreatePersonDto> {}

PersonsInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: 'persons',
  },
);
