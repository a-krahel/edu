import * as process from 'process';

import { Users } from '../users/users.model';

const env = process.env;

export default () => ({
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
    // signOptions: {},
  },
  port: parseInt(env.NODE_PORT) || 3000,
});
