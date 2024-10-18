import { Sequelize, Dialect } from 'sequelize';
import * as config from '../../config/config.json';

export const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect as Dialect,
  }
);
