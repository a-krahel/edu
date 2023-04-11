import { randomBytes } from 'node:crypto';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import { Op } from 'sequelize';

import { WeatherDto } from './dto/weather.dto';
import { Weather } from './weather.model';

@Injectable()
export class WeatherService {
  /**
   * @ignore
   */
  constructor(
    @InjectModel(Weather)
    private weatherModel: typeof Weather,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

  /**
   * A method that fetches weather data from the current user with a given id. Example:
   * @example
   * const user = await WeatherService.getWeatherByUser(1);
   * @param id An id of a user
   * @returns A promise with the list of weather
   */

  // manual caching
  async getWeatherByUser(id) {
    const value = await this.cacheManager.get(id);
    if (value) return value;

    const data = await this.weatherModel.findAll({
      where: {
        createdBy: id,
      },
    });

    await this.cacheManager.set(id, data);

    return data;
  }

  /**
   * A method that add weather data from the current user with a given id. Example:
   * @example
   * WeatherService.addWeather(city, latitude, longitude, date, temperature, createdBy, 1);
   * @param id An id of a user
   * @returns A promise with the list of weather
   */
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
