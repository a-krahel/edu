import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Body,
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Cache } from 'cache-manager';

import { WeatherDto } from './dto/weather.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
@UseInterceptors(ClassSerializerInterceptor)
export class WeatherController {
  constructor(
    private weatherService: WeatherService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @Get('')
  @UseGuards(AuthGuard())
  getAllWeatherData() {
    return this.weatherService.getAllWeatherData();
  }

  // manual caching
  @Get('/byUser')
  @UseGuards(AuthGuard())
  getWeatherByUser(@Req() request) {
    return this.weatherService.getWeatherByUser(request.body.id);
  }

  @UseInterceptors(CacheInterceptor)
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
