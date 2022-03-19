import createConnection from '../';
import { createAdmin } from '../seeds/admin';

(async () => {
  const connection = await createConnection('localhost');

  await createAdmin(connection);

  await connection.close();
})();
