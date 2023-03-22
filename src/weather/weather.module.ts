import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from '../users/users.module';
import { WeatherController } from './weather.controller';
import { Weather } from './weather.model';
import { WeatherService } from './weather.service';

@Module({
  controllers: [WeatherController],
  imports: [UsersModule, SequelizeModule.forFeature([Weather])],
  providers: [WeatherService, JwtService],
})
export class WeatherModule {}
