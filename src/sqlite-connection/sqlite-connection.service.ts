import { Injectable } from '@nestjs/common';
import db from './config/config.database';
import { v4 as uuidv4 } from 'uuid';
import { PersonsInstance } from './dto/persons.dto';
import { CreatePersonDto } from './../../src/persons/dto/create-person.dto';

@Injectable()
export class SqliteConnectionService {
  public init() {
    db.sync().then(() => {
      console.log('connect to db');
    });
  }

  public async create(body: CreatePersonDto) {
    const id = uuidv4();
    try {
      const record = await PersonsInstance.create({ ...body, id });
      return { record, msg: 'Successfully create todo' };
    } catch (e) {
      console.log(e);
      return { msg: 'fail to create', status: 500, route: '/persons' };
    }
  }

  public async findAll() {
    try {
      //const limit = (body.limit as number | undefined) || 10;
      //const offset = body.offset as number | undefined;

      const records = await PersonsInstance.findAll({
        where: {},
      });
      return records;
    } catch (e) {
      return { msg: 'fail to read', status: 500, route: '/persons' };
    }
  }

  public async findOne(id: string) {
    try {
      const record = await PersonsInstance.findOne({ where: { id } });
      return record;
    } catch (e) {
      return { msg: 'fail to read', status: 500, route: '/read/:id' };
    }
  }

  public async update(id: string, body: CreatePersonDto) {
    try {
      const record = await PersonsInstance.findOne({ where: { id } });

      if (!record) {
        return { msg: 'Can not find existing record' };
      }

      const updatedRecord = await record.update({
        name: body.name,
        emailAddress: body.emailAddress,
      });
      return { record: updatedRecord };
    } catch (e) {
      return {
        msg: 'fail to read',
        status: 500,
        route: '/update/:id',
      };
    }
  }

  public async remove(id: string) {
    try {
      const record = await PersonsInstance.findOne({ where: { id } });

      if (!record) {
        return { msg: 'Can not find existing record' };
      }

      const deletedRecord = await record.destroy();
      return { record: deletedRecord };
    } catch (e) {
      return {
        msg: 'fail to read',
        status: 500,
        route: '/delete/:id',
      };
    }
  }
}
