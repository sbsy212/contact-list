import { Injectable } from '@nestjs/common';
import db from './config/config.database';
import { v4 as uuidv4 } from 'uuid';
import { PersonsInstance } from './dto/persons.dto';
import { CreatePersonDto } from './../../src/persons/dto/create-person.dto';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { AddressesInstance } from './dto/addresses.dto';

@Injectable()
export class SqliteConnectionService {
  public init() {
    db.sync().then(() => {
      console.log('connect to db');
    });
  }

  public async createPerson(body: CreatePersonDto) {
    const id = uuidv4();
    try {
      const person = await PersonsInstance.create({ ...body, id });
      return { person, msg: 'Successfully created entry' };
    } catch (e) {
      console.log(e);
      return { msg: 'fail to create', status: 500, route: '/persons' };
    }
  }

  public async findAllPersons() {
    try {
      const persons = await PersonsInstance.findAll({
        where: {},
      });
      return persons;
    } catch (e) {
      return { msg: 'fail to read', status: 500, route: '/persons' };
    }
  }

  public async findOnePerson(id: string) {
    try {
      const person = await PersonsInstance.findOne({ where: { id } });
      return person;
    } catch (e) {
      return { msg: 'fail to read', status: 500, route: '/read/:id' };
    }
  }

  public async updatePerson(id: string, body: CreatePersonDto) {
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
        msg: 'fail to read',
        status: 500,
        route: '/update/:id',
      };
    }
  }

  public async removePerson(id: string) {
    try {
      const person = await PersonsInstance.findOne({ where: { id } });

      if (!person) {
        return { msg: 'Can not find existing person' };
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

  public async createAddress(id: string, body: CreateAddressDto) {
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

  public async findAllAddresses() {
    try {
      const addresses = await AddressesInstance.findAll({
        where: {},
      });
      return addresses;
    } catch (e) {
      return { msg: 'fail to read', status: 500, route: '/addresses' };
    }
  }

  public async findOneAddress(id: string) {
    try {
      const address = await AddressesInstance.findOne({ where: { id } });
      return address;
    } catch (e) {
      return { msg: 'fail to read', status: 500, route: '/addresses/:id' };
    }
  }

  public async updateAddress(id: string, body: CreateAddressDto) {
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

  public async removeAddress(id: string) {
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
