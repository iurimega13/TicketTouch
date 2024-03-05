import { Module } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqsController } from './faqs.controller';
import { FaqEntity } from '../faqs/entities/faq.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FaqEntity])  
  ],
  controllers: [FaqsController],
  providers: [FaqsService],
  exports: [FaqsService]
})
export class FaqsModule {}
