import { Module } from '@nestjs/common';
import { FaqsService } from './faqs.service';

@Module({
  providers: [FaqsService]
})
export class FaqsModule {}
