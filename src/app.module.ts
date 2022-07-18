import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './persons/persons.module';
import { SqliteConnectionService } from './sqlite-connection/sqlite-connection.service';
import { SqliteConnectionModule } from './sqlite-connection/sqlite-connection.module';

@Module({
  imports: [PersonsModule, SqliteConnectionModule],
  controllers: [AppController],
  providers: [AppService, SqliteConnectionService],
})
export class AppModule {}
