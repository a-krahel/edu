import * as process from 'process';
import { Dialect } from 'sequelize/types/sequelize';

import { Users } from '../users/users.model';
import { Weather } from '../weather/weather.model';

const env = process.env;

export default () => ({
  bcrypt: env.SALT,
  cache: {
    max: parseInt(env.CACHING_ITEMS),
    ttl: parseInt(env.CACHING_TIME),
  },
  database: {
    database: env.DB_DATABASE,
    dialect: env.DB_DIALECT as Dialect,
    host: env.DB_HOST,
    models: [Users, Weather],
    password: env.DB_PASSWORD,
    port: parseInt(env.DB_PORT),
    username: env.DB_USER,
  },
  jwt: {
    expiresIn: parseInt(env.JWT_LIFETIME),
    secret: env.JWT_SECRET,
  },
  port: parseInt(env.NODE_PORT) || 3000,
});
