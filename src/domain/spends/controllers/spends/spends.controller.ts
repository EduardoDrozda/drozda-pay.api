import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards';
import { CreateSpendDto } from '../../dtos';
import { SpendsService } from '../../services';

@Controller('spends')
export class SpendsController {
  constructor(private readonly spendsService: SpendsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(@Req() { userId }: any, @Body() createSpendDto: CreateSpendDto) {
    await this.spendsService.create({ ...createSpendDto, userId });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() { userId }: any) {
    return await this.spendsService.findAll(userId);
  }
}
