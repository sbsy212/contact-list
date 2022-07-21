import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { SqliteConnectionService } from './../sqlite-connection/sqlite-connection.service';

@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly sqliteConnectionService: SqliteConnectionService,
  ) {}

  @Post(':id')
  create(@Param('id') id: string, @Body() createAddressDto: CreateAddressDto) {
    return this.sqliteConnectionService.createAddress(id, createAddressDto);
  }

  @Get()
  findAll() {
    return this.sqliteConnectionService.findAllAddresses();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sqliteConnectionService.findOneAddress(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createAddressDto: CreateAddressDto) {
    return this.sqliteConnectionService.updateAddress(id, createAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sqliteConnectionService.removeAddress(id);
  }
}
