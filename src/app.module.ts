import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as process from 'process';
import { Dialect } from 'sequelize/types/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/app';
import { Users } from './users/users.model';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env', '.local.env'],
      load: [configuration],
    }),
    SequelizeModule.forRoot({
      database: process.env.DB_DATABASE,
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      models: [Users],
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
    }),
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {}
