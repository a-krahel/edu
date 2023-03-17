import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Weather } from './weather.model';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather)
    private weatherModel: typeof Weather,
  ) {}

  getAllWeatherData() {
    return this.weatherModel.findAll();
  }

  getWeatherByCity(city) {
    return this.weatherModel.findOne({
      where: {
        city,
      },
    });
  }
}
