import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get('')
  @UseGuards(AuthGuard())
  getAllWeatherData() {
    return this.weatherService.getAllWeatherData();
  }

  @Get('/:city')
  @UseGuards(AuthGuard())
  getWeatherByCity(@Param('city') city) {
    return this.weatherService.getWeatherByCity(city);
  }
}
