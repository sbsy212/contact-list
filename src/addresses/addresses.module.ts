import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { SqliteConnectionModule } from 'src/sqlite-connection/sqlite-connection.module';

@Module({
  imports: [SqliteConnectionModule],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
