import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { SqliteConnectionService } from 'src/sqlite-connection/sqlite-connection.service';

@Controller('/persons')
export class PersonsController {
  constructor(
    private readonly personsService: PersonsService,
    private readonly sqliteConnectionService: SqliteConnectionService,
  ) {}

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto) {
    return await this.sqliteConnectionService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.sqliteConnectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.sqliteConnectionService.findOne(id);
  }

  @Patch()
  update(@Param('id') id: string, @Body() createPersonDto: CreatePersonDto) {
    return this.sqliteConnectionService.update(id, createPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sqliteConnectionService.remove(id);
  }
}
