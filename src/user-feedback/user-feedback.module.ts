import { Module } from '@nestjs/common';
import { UserFeedbackController } from './user-feedback.controller';

@Module({
  controllers: [UserFeedbackController]
})
export class UserFeedbackModule {}
