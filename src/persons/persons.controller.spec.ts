import { Test, TestingModule } from '@nestjs/testing';
import { SqliteConnectionService } from './../../src/sqlite-connection/sqlite-connection.service';
import { PersonsController } from './persons.controller';

describe('PersonsController', () => {
  let controller: PersonsController;
  let sqliteConnectionServiceMock: SqliteConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonsController],
      providers: [
        {
          provide: SqliteConnectionService,
          useClass: SqliteConnectionService,
        },
      ],
    }).compile();

    sqliteConnectionServiceMock = module.get<SqliteConnectionService>(
      SqliteConnectionService,
    );
    controller = module.get<PersonsController>(PersonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
