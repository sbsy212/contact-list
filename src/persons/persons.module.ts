import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { SqliteConnectionModule } from './../sqlite-connection/sqlite-connection.module';

@Module({
  imports: [SqliteConnectionModule],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
