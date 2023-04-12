import * as process from 'process';

import { Users } from '../users/users.model';

const env = process.env;

export default () => ({
  cache: {
    max: parseInt(env.CACHING_ITEMS),
    ttl: parseInt(env.CACHING_TIME),
  },
  database: {
    database: env.DB_DATABASE,
    dialect: env.DB_DIALECT,
    host: env.DB_HOST,
    models: [Users],
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
