import { Router } from 'express';

import { createCategoryRouter } from '../modules/cars/createCategory/CreateCategoryRouter';
import { importCategoryRouter } from '../modules/cars/importCategory/ImportCategoryRouter';
import { listCategoriesRouter } from '../modules/cars/listCategories/ListCategoriesRouter';

const categoriesRoutes = Router();

categoriesRoutes.use(createCategoryRouter);
categoriesRoutes.use(listCategoriesRouter);
categoriesRoutes.use(importCategoryRouter);

export { categoriesRoutes };
