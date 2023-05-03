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

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/app';
import { IsActiveMiddleware } from './users/isActive.middleware';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { WeatherController } from './weather/weather.controller';
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
    SequelizeModule.forRoot(configuration().database),
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
