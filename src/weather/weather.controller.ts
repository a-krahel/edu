import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { WeatherDto } from './dto/weather.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get('')
  @UseGuards(AuthGuard())
  getAllWeatherData() {
    return this.weatherService.getAllWeatherData();
  }

  @Get('/byUser')
  @UseGuards(AuthGuard())
  getWeatherByUser(@Headers('authorization') authorization) {
    return this.weatherService.getWeatherByUser(authorization);
  }

  @Get('/:city')
  @UseGuards(AuthGuard())
  getWeatherByCity(@Param('city') city) {
    return this.weatherService.getWeatherByCity(city);
  }

  @Post('')
  @UseGuards(AuthGuard())
  addWeather(
    @Body() weatherDto: WeatherDto,
    @Headers('authorization') authorization,
  ) {
    return this.weatherService.addWeather(weatherDto, authorization);
  }
}
