import { Module } from '@nestjs/common';
import { UserFeedbackController } from './user-feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackEntity } from './entities/feedback.entity';
import { UserFeedbackService } from './user-feedback.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedbackEntity]),
  ],
  controllers: [UserFeedbackController],
  providers: [UserFeedbackService],
  exports: [UserFeedbackService],
})
export class UserFeedbackModule {}
