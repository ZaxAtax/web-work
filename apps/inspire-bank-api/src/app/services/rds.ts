import { Client } from 'pg';

export class RdsService {
  client: Client;
  constructor(
    user: string,
    password: string,
    port: string | number,
    host: string,
    database: string
  ) {
    this.client = new Client({
      user,
      host,
      database,
      password,
      port,
    });
    this.client.connect();
  }

  executeStatement(statement: { text: string; values: unknown[] }) {
    return this.client.query(statement);
  }
}
const {PG_USER, PG_PASS, PG_DB, PG_HOST, PG_PORT} = process.env
export const rds = new RdsService(PG_USER, PG_PASS, PG_PORT, PG_HOST, PG_DB);

export default rds;
