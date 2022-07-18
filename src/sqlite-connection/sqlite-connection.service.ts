import { Injectable } from '@nestjs/common';
import db from './config/config.database';
import { v4 as uuidv4 } from 'uuid';
import { PersonsInstance } from './dto/persons.dto';

@Injectable()
export class SqliteConnectionService {
  public init() {
    db.sync().then(() => {
      console.log('connect to db');
    });
  }
  public async create(body) {
    const id = uuidv4();
    try {
      const record = await PersonsInstance.create({ ...body, id });
      return { record, msg: 'Successfully create todo' };
    } catch (e) {
      console.log(e);
      return { msg: 'fail to create', status: 500, route: '/persons' };
    }
  }
}
