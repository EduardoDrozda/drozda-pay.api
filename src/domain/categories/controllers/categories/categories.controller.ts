import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
  Req,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards';
import { CreateCategoryDto } from '../../dtos';
import { CategoriesService } from '../../services/categories/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(@Req() { userId }: any, @Body() category: CreateCategoryDto) {
    return await this.categoriesService.create({ ...category, userId });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllByUserId(@Req() { userId }: any) {
    return await this.categoriesService.findAllByUserId(userId);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findById(@Req() { userId }: any, @Param('id') id: string) {
    return await this.categoriesService.findById(parseInt(id, 10), userId);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() { userId }: any,
    @Param('id') id: string,
    @Body() category: CreateCategoryDto,
  ) {
    return await this.categoriesService.update(
      parseInt(id, 10),
      userId,
      category,
    );
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async delete(@Req() { userId }: any, @Param('id') id: string) {
    await this.categoriesService.delete(parseInt(id, 10), userId);
  }
}
