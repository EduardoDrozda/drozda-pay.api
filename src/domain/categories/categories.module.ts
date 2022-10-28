import { CategoriesController } from './controllers';
import { CategoriesRepository } from './repositories';
import { CategoriesService } from './services';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesRepository, CategoriesService],
  exports: [CategoriesRepository, CategoriesService],
})
export class CategoriesModule {}
