import request from 'supertest';
import { Connection } from 'typeorm';

import { ICreateCategoryDTO } from '@domain/dtos/cars/ICreateCategoryDTO';
import createConnection from '@infra/database/typeorm';
import { createAdmin } from '@infra/database/typeorm/seeds/admin';
import { app } from '@interface/http/express/app';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await createAdmin(connection);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new category', async () => {
    // Given
    const responseToken = await request(app).post('/auth/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });
    const { token } = responseToken.body;
    const newCategoryDto: ICreateCategoryDTO = {
      name: 'test-category',
      description: 'test-description',
    };

    // When
    const response = await request(app)
      .post('/categories')
      .send(newCategoryDto)
      .set({
        Authorization: `Bearer ${token}`,
      });

    // Then
    expect(response.status).toBe(201);
  });

  it('Should not be able to create a new category if already exists', async () => {
    // Given
    const responseToken = await request(app).post('/auth/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });
    const { token } = responseToken.body;
    const categoryAlreadyExistsDto: ICreateCategoryDTO = {
      name: 'test-category',
      description: 'test-description',
    };

    // When
    const response = await request(app)
      .post('/categories')
      .send(categoryAlreadyExistsDto)
      .set({
        Authorization: `Bearer ${token}`,
      });

    // Then
    expect(response.status).toBe(400);
  });
});
