import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { DataTypes, Model } from 'sequelize';
import db from '../config/config.database';

export class AddressesInstance extends Model<CreateAddressDto> {}

AddressesInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: 'addresses',
  },
);
