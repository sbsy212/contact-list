import { Module } from '@nestjs/common';
import { PersonsController } from './persons.controller';
import { SqliteConnectionModule } from './../sqlite-connection/sqlite-connection.module';

@Module({
  imports: [SqliteConnectionModule],
  controllers: [PersonsController],
})
export class PersonsModule {}
