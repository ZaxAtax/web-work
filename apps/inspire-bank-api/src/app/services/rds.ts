import {
  RDSDataClient,
  ExecuteStatementCommand,
} from '@aws-sdk/client-rds-data';

export interface RdsServiceConfiguration {
  secretArn: string;
  dbArn: string;
  region: string;
  database: string;
}

export class RdsService {
  dbArn: string;

  secretArn: string;

  client: RDSDataClient;

  database: string;

  constructor({ secretArn, dbArn, region, database }: RdsServiceConfiguration) {
    this.dbArn = dbArn;
    this.secretArn = secretArn;
    this.client = new RDSDataClient({ region });
    this.database = database;

    // Create tables here
  }

  // TODO: add transaction support
  executeStatement(statement: string) {
    return this.client.send(
      new ExecuteStatementCommand({
        resourceArn: this.dbArn,
        secretArn: this.secretArn,
        database: this.database,
        sql: statement,
      })
    );
  }
}

export const rds = new RdsService({
  dbArn: 'arn:aws:rds:us-east-1:713231858018:db:inspire-bank-db',
  secretArn:
    'arn:aws:secretsmanager:us-east-1:713231858018:secret:dbsecret-UlyLRQ',
  region: 'us-east-1',
  database: 'inspire-bank-db',
});

export default rds;
