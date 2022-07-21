import { Inject, Injectable } from '@nestjs/common';
import db from './config/config.database';
import { v4 as uuidv4 } from 'uuid';
import { PersonsInstance } from './dto/persons.dto';
import { CreatePersonDto } from './../../src/persons/dto/create-person.dto';
import { CreateAddressDto } from './../../src/addresses/dto/create-address.dto';
import { AddressesInstance } from './dto/addresses.dto';
import { CONFIG_OPTIONS, DB } from './sqlite-connection.module';

@Injectable()
export class SqliteConnectionService {
  // constructor(@Inject(CONFIG_OPTIONS) db: DB) {
  //   db.db;
  //   const filePath = `${process.env.NODE_ENV || 'development'}.env`;
  //   const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
  //   this.envConfig = db.db;
  // }

  public init() {
    db.sync().then(() => {
      console.log('connect to db');
    });
  }

  public async createPerson(
    body: CreatePersonDto,
  ): Promise<
    | { msg: string }
    | { person: PersonsInstance; msg: string }
    | { msg: string; status: number; route: string }
  > {
    const id = uuidv4();
    try {
      const person = await PersonsInstance.create({ ...body, id });
      return { person, msg: 'Successfully created entry' };
    } catch (e) {
      console.log(e);
      return { msg: 'fail to create', status: 500, route: '/persons' };
    }
  }

  public async findAllPersons(): Promise<
    PersonsInstance[] | { msg: string; status: number; route: string }
  > {
    try {
      const persons = await PersonsInstance.findAll({
        where: {},
      });
      return persons;
    } catch (e) {
      return { msg: 'fail to read', status: 500, route: '/persons' };
    }
  }

  public async findOnePerson(
    id: string,
  ): Promise<PersonsInstance | { msg: string; status: number; route: string }> {
    try {
      const person = await PersonsInstance.findOne({ where: { id } });
      return person;
    } catch (e) {
      return { msg: 'fail to read', status: 500, route: '/read/:id' };
    }
  }

  public async updatePerson(
    id: string,
    body: CreatePersonDto,
  ): Promise<
    | { msg: string }
    | { person: PersonsInstance }
    | { msg: string; status: number; route: string }
  > {
    try {
      const person = await PersonsInstance.findOne({ where: { id } });

      if (!person) {
        return { msg: 'Can not find existing person' };
      }

      const updatedPerson = await person.update({
        name: body.name,
        emailAddress: body.emailAddress,
      });
      return { person: updatedPerson };
    } catch (e) {
      return {
        msg: 'fail to update',
        status: 500,
        route: '/update/:id',
      };
    }
  }

  public async removePerson(
    id: string,
  ): Promise<
    | { msg: string }
    | { person: void }
    | { msg: string; status: number; route: string }
  > {
    try {
      const person = await PersonsInstance.findOne({ where: { id } });

      if (!person) {
        return { msg: 'Can not find existing person' };
      }

      const address = await AddressesInstance.findOne({ where: { id } });

      if (address) {
        await address.destroy;
      }

      const deletedPerson = await person.destroy();
      return { person: deletedPerson };
    } catch (e) {
      return {
        msg: 'fail to read',
        status: 500,
        route: '/delete/:id',
      };
    }
  }

  public async createAddress(
    id: string,
    body: CreateAddressDto,
  ): Promise<
    | { msg: string }
    | { address: AddressesInstance; msg: string }
    | { msg: string; status: number; route: string }
  > {
    try {
      const person = await PersonsInstance.findOne({ where: { id } });
      if (!person) {
        return { msg: 'Can not find existing person' };
      }

      const address = await AddressesInstance.create({ ...body, id });
      return { address, msg: 'Successfully created address' };
    } catch (e) {
      console.log(e);
      return { msg: 'fail to create', status: 500, route: '/addresses' };
    }
  }

  public async findAllAddresses(): Promise<
    AddressesInstance[] | { msg: string; status: number; route: string }
  > {
    try {
      const addresses = await AddressesInstance.findAll({
        where: {},
      });
      return addresses;
    } catch (e) {
      return { msg: 'fail to read', status: 500, route: '/addresses' };
    }
  }

  public async findOneAddress(
    id: string,
  ): Promise<
    AddressesInstance | { msg: string; status: number; route: string }
  > {
    try {
      const address = await AddressesInstance.findOne({ where: { id } });
      return address;
    } catch (e) {
      return { msg: 'fail to read', status: 500, route: '/addresses/:id' };
    }
  }

  public async updateAddress(
    id: string,
    body: CreateAddressDto,
  ): Promise<
    | { msg: string }
    | { address: AddressesInstance }
    | { msg: string; status: number; route: string }
  > {
    try {
      const address = await AddressesInstance.findOne({ where: { id } });

      if (!address) {
        return { msg: 'Can not find existing address' };
      }

      const updatedAddress = await address.update({
        postalCode: body.postalCode,
        countryCode: body.countryCode,
      });
      return { address: updatedAddress };
    } catch (e) {
      return {
        msg: 'fail to read',
        status: 500,
        route: '/update/:id',
      };
    }
  }

  public async removeAddress(
    id: string,
  ): Promise<
    | { msg: string }
    | { address: void }
    | { msg: string; status: number; route: string }
  > {
    try {
      const address = await AddressesInstance.findOne({ where: { id } });

      if (!address) {
        return { msg: 'Can not find existing address' };
      }

      const deletedAddress = await address.destroy();
      return { address: deletedAddress };
    } catch (e) {
      return {
        msg: 'fail to read',
        status: 500,
        route: '/addresses/:id',
      };
    }
  }
}
