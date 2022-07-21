import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './persons/persons.module';
import { SqliteConnectionModule } from './sqlite-connection/sqlite-connection.module';
import { AddressesModule } from './addresses/addresses.module';
import db from './sqlite-connection/config/config.database';

@Module({
  imports: [
    PersonsModule,
    SqliteConnectionModule.register({ db: 'sqlite' }),
    AddressesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
