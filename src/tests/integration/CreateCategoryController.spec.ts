import request from 'supertest';

import { app } from '@interface/http/express/app';

import { ICreateCategoryDTO } from '../../domain/dtos/cars/ICreateCategoryDTO';

describe('Create Category Controller', () => {
  it('Should be able to create a new category', async () => {
    // Given
    const newCategoryDto: ICreateCategoryDTO = {
      name: 'test-category',
      description: 'test-description',
    };

    // When
    const response = await request(app)
      .post('/categories')
      .send(newCategoryDto);

    // Then
    expect(response.status).toBe(201);
  });
});
