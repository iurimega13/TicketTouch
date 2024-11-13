import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { UserFeedbackService } from './user-feedback.service';
import { CreateFeedbackDto } from './dtos/createFeedback.dto';

@Controller('user-feedback')
export class UserFeedbackController {
  constructor(private readonly userFeedbackService: UserFeedbackService) {}

  @Post()
  async createFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto,
  ) {
    return this.userFeedbackService.createFeedback(createFeedbackDto);
  }

  @Get(':ticketId')
  async getFeedbackByTicketId(@Param('ticketId') ticketId: string) {
    return this.userFeedbackService.getFeedbackByTicketId(ticketId);
  }
}