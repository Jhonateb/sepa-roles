import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './entities/tour.entity';
import { CaslModule } from '../casl/casl.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Tour]),
    CaslModule, 
  ],
  controllers: [ToursController],
  providers: [ToursService],
})
export class ToursModule {}