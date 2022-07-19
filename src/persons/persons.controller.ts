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
import { SqliteConnectionService } from 'src/sqlite-connection/sqlite-connection.service';

@Controller('/persons')
export class PersonsController {
  constructor(
    private readonly sqliteConnectionService: SqliteConnectionService,
  ) {}

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto) {
    return await this.sqliteConnectionService.createPerson(createPersonDto);
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
    return this.sqliteConnectionService.updatePerson(id, createPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sqliteConnectionService.removePerson(id);
  }
}
