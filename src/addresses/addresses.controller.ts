import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SqliteConnectionService } from 'src/sqlite-connection/sqlite-connection.service';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
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
