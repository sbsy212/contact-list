import { Test, TestingModule } from '@nestjs/testing';
import { SqliteConnectionService } from './sqlite-connection.service';

describe('SqliteConnectionService', () => {
  let service: SqliteConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqliteConnectionService],
    }).compile();

    service = module.get<SqliteConnectionService>(SqliteConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
