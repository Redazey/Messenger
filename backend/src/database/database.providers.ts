import { Sequelize } from 'sequelize-typescript';
import { dbConfig } from './constants';
import { Dialect } from 'sequelize';
import { UsersChats } from './users_chats.entity';
import { Contact } from './contacts.entity';
import { Message } from './messages.entity';
import { User } from '../users/users.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(
        dbConfig.development.database,
        dbConfig.development.username,
        dbConfig.development.password,
        {
          host: dbConfig.development.host,
          dialect: dbConfig.development.dialect as Dialect,
        }
      );
      sequelize.addModels([UsersChats, UsersChats, Contact, Message, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
