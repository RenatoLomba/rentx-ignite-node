import { hash } from 'bcryptjs';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

export async function createAdmin(connection: Connection) {
  const id = uuid();
  const password = await hash('admin', 8);

  await connection.query(
    `
      INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
      VALUES('${id}', 'Administrator', 'admin@rentx.com', '${password}', true, 'now()', 'not have')
    `,
  );
}
