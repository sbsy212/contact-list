import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { SqliteConnectionService } from './../sqlite-connection/sqlite-connection.service';

@Controller('/persons')
export class PersonsController {
  constructor(
    private readonly sqliteConnectionService: SqliteConnectionService,
  ) {}

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto) {
    const regexp = new RegExp(`^(.+)@(.+)$`);
    if (!regexp.test(createPersonDto.emailAddress)) {
      console.log('regex failed');
      return await {
        msg: 'the email address is wrong',
        status: 400,
        route: '/persons',
      };
    } else {
      console.log('regex didnt fail');
      return await this.sqliteConnectionService.createPerson(createPersonDto);
    }
  }

  @Get()
  findAll() {
    return this.sqliteConnectionService.findAllPersons();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.sqliteConnectionService.findOnePerson(id);
  }

  @Patch()
  update(@Param('id') id: string, @Body() createPersonDto: CreatePersonDto) {
    const regexp = new RegExp(`^(.+)@(.+)$`);
    if (!regexp.test(createPersonDto.emailAddress)) {
      console.log('regex failed');
      return {
        msg: 'the email address is wrong',
        status: 400,
        route: '/persons',
      };
    } else {
      console.log('regex didnt fail');
      return this.sqliteConnectionService.updatePerson(id, createPersonDto);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sqliteConnectionService.removePerson(id);
  }
}
