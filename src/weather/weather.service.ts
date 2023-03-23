import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';

import { JwtStrategy } from '../users/jwt.stategy';
import { UsersService } from '../users/users.service';
import { WeatherDto } from './dto/weather.dto';
import { Weather } from './weather.model';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather)
    private weatherModel: typeof Weather,
    private usersService: UsersService,
    private jwtStrategy: JwtStrategy,
    private jwtService: JwtService,
  ) {}

  getAllWeatherData() {
    return this.weatherModel.findAll();
  }

  getWeatherByCity(city) {
    return this.weatherModel.findAll({
      where: {
        city,
      },
    });
  }

  async getWeatherByUser(authorization) {
    const payload = await this.jwtService.decode(authorization.slice(7));

    return this.weatherModel.findAll({
      where: {
        createdBy: payload['id'],
      },
    });
  }

  async addWeather(weatherDto: WeatherDto, authorization) {
    const payload = await this.jwtService.decode(authorization.slice(7));

    this.weatherModel.create({ ...weatherDto, createdBy: payload['id'] });
  }
}
