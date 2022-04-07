import request from 'supertest';
import { Connection } from 'typeorm';

import { ICreateCategoryDTO } from '@domain/dtos/cars/ICreateCategoryDTO';
import createConnection from '@infra/database/typeorm';
import { createAdmin } from '@infra/database/typeorm/seeds/admin';
import { app } from '@interface/http/express/app';

let connection: Connection;

describe('List Categories Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await createAdmin(connection);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to list all categories', async () => {
    // Given
    const responseToken = await request(app).post('/auth/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });
    const { token } = responseToken.body;
    const createCategoryDto: ICreateCategoryDTO = {
      name: 'test-category',
      description: 'test-description',
    };
    await request(app)
      .post('/categories')
      .send(createCategoryDto)
      .set({
        Authorization: `Bearer ${token}`,
      });

    // When
    const response = await request(app)
      .get('/categories')
      .send()
      .set({
        Authorization: `Bearer ${token}`,
      });

    const { categories } = response.body;

    // Then
    expect(response.status).toBe(200);
    expect(categories.length).toBe(1);
    expect(categories[0]).toHaveProperty('id');
  });
});
