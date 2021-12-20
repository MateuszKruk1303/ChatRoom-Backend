import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION_NAME } from '../shared';

const { DB_PORT, DB_PASS, DB_HOST, DB_NAME, DB_USER } = process.env;

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION_NAME,
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: DB_HOST,
        database: DB_NAME,
        port: parseInt(DB_PORT),
        username: DB_USER,
        password: String(DB_PASS),
        // .js must be here: due to ts -> js transpilation process
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
