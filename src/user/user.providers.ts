import { Connection } from 'typeorm';
import { DATABASE_CONNECTION_NAME } from 'src/shared';
import { USER_REPOSITORY } from './constants';
import { User } from './entities';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION_NAME],
  },
];
