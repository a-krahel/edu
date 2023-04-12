import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import * as process from 'process';
import { Dialect } from 'sequelize/types/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/app';
import { IsActiveMiddleware } from './users/isActive.middleware';
import { UsersController } from './users/users.controller';
import { Users } from './users/users.model';
import { UsersModule } from './users/users.module';
import { WeatherController } from './weather/weather.controller';
import { Weather } from './weather/weather.model';
import { WeatherModule } from './weather/weather.module';

@Module({
  controllers: [AppController],
  imports: [
    CacheModule.register({
      isGlobal: true,
      ...configuration().cache,
    }),

    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env', '.local.env'],
      load: [configuration],
    }),
    SequelizeModule.forRoot({
      database: process.env.DB_DATABASE,
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      models: [Users, Weather],
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
    }),
    UsersModule,
    WeatherModule,
  ],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsActiveMiddleware)
      .exclude(
        { method: RequestMethod.POST, path: 'users' },
        { method: RequestMethod.POST, path: 'users/(.*)' },
        { method: RequestMethod.POST, path: 'weather/generate-new-data' },
      )
      .forRoutes(UsersController, WeatherController);
  }
}
