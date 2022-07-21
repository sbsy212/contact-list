import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { SqliteConnectionModule } from './../sqlite-connection/sqlite-connection.module';

@Module({
  imports: [SqliteConnectionModule],
  controllers: [AddressesController],
})
export class AddressesModule {}
