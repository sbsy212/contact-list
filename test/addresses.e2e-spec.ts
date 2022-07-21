import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
//import request from 'supertest';
import { PersonsInstance } from './../src/sqlite-connection/dto/persons.dto';
import { AddressesInstance } from './../src/sqlite-connection/dto/addresses.dto';

describe('AddressesController e2e test', () => {
  let app: INestApplication;
  const person = {
    name: 'test',
    emailAddress: 'test@bub.com',
  };
  const address = {
    postalCode: '12',
    countryCode: '12',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should have person and msg when created', async () => {
    const mockCreatePerson = jest.fn((): any => person);
    jest
      .spyOn(PersonsInstance, 'create')
      .mockImplementation(() => mockCreatePerson());

    const response = await request(app.getHttpServer())
      .post('/persons')
      .send(person)
      .expect(201);

    expect(mockCreatePerson).toHaveBeenCalledTimes(1);
    expect(response.body).toHaveProperty('msg');
    expect(response.body.person).toHaveProperty('name');
    expect(response.body.person.name).toEqual(person.name);
  });

  it('Should have address and msg when created', async () => {
    const mockCreateAddress = jest.fn((): any => address);
    jest
      .spyOn(AddressesInstance, 'create')
      .mockImplementation(() => mockCreateAddress());

    const response = await request(app.getHttpServer())
      .post('/addresses/id')
      .send(address)
      .expect(201);

    expect(mockCreateAddress).toHaveBeenCalledTimes(0);
    expect(response.body).toEqual({ msg: 'Can not find existing person' });
  });

  it('should get all addresses', async () => {
    return request(app.getHttpServer()).get('/addresses').expect(200);
  });

  it('should get all persons', async () => {
    return request(app.getHttpServer()).get('/persons').expect(200);
  });
});
