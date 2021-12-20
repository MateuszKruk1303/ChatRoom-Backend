import { Connection } from 'typeorm';
import { DATABASE_CONNECTION_NAME } from 'src/shared';
import { AUTH_REPOSITORY } from './constants';
import { User } from './entities';

export const authProviders = [
  {
    provide: AUTH_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION_NAME],
  },
];
