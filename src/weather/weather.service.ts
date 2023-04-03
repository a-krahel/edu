import { randomBytes } from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { WeatherDto } from './dto/weather.dto';
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
    return this.weatherModel.findAll({
      where: {
        city,
      },
    });
  }

  async getWeatherByUser(id) {
    return this.weatherModel.findAll({
      where: {
        createdBy: id,
      },
    });
  }

  addWeather(weatherDto: WeatherDto, id) {
    this.weatherModel.create({ ...weatherDto, createdBy: id });
  }

  generateNewData() {
    this.weatherModel.create({
      additionalText: randomBytes(255).toString('hex'),
      city: randomBytes(6).toString('hex'),
      createdBy: 6,
      date: Date.now(),
      latitude: Math.round(Math.random() * 91 * 1000000) / 1000000,
      longitude: Math.round(Math.random() * 181 * 1000000) / 1000000,
      temperature: Math.round(Math.random() * 50),
    });
  }
}
