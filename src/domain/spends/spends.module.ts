import { CategoriesModule } from '../categories';
import { Module } from '@nestjs/common';
import { SpendsController } from './controllers';
import { SpendsRepository } from './repositories';
import { SpendsService } from './services';

@Module({
  imports: [CategoriesModule],
  controllers: [SpendsController],
  providers: [SpendsService, SpendsRepository],
})
export class SpendsModule {}
