import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  UseGuards,
  Req,
  Get,
  Put,
  Param,
  Delete,
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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Req() { userId }: any, @Body('id') id: number) {
    return await this.spendsService.findById(id, userId);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() { userId }: any,
    @Param('id') id: string,
    @Body() category: CreateSpendDto,
  ) {
    return await this.spendsService.update(parseInt(id, 10), userId, category);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Req() { userId }: any, @Param('id') id: string) {
    return await this.spendsService.delete(parseInt(id, 10), userId);
  }
}
