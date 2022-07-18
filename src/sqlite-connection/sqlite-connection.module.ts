import { Module } from '@nestjs/common';
import { SqliteConnectionService } from './sqlite-connection.service';

@Module({
  providers: [
    {
      provide: SqliteConnectionService,
      useFactory() {
        const sqliteConnectionService: SqliteConnectionService =
          new SqliteConnectionService();
        sqliteConnectionService.init();
        return sqliteConnectionService;
      },
    },
  ],

  exports: [SqliteConnectionService],
})
export class SqliteConnectionModule {}
