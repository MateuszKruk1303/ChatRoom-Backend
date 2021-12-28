import { Connection } from 'typeorm';
import { DATABASE_CONNECTION_NAME } from 'src/shared';
import { MESSAGES_REPOSITORY } from './constants';
import { Message } from './entities';

export const messageProviders = [
  {
    provide: MESSAGES_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Message),
    inject: [DATABASE_CONNECTION_NAME],
  },
];
