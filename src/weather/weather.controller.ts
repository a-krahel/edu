import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
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
  getWeatherByUser(@Req() request) {
    return this.weatherService.getWeatherByUser(request.body.id);
  }

  @Get('/:city')
  @UseGuards(AuthGuard())
  getWeatherByCity(@Param('city') city) {
    return this.weatherService.getWeatherByCity(city);
  }

  @Post('')
  @UseGuards(AuthGuard())
  addWeather(@Body() weatherDto: WeatherDto, @Req() request) {
    return this.weatherService.addWeather(weatherDto, request.body.id);
  }

  @Post('/generate-new-data')
  generateNewData() {
    return this.weatherService.generateNewData();
  }
}
