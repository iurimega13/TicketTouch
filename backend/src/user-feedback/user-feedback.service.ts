import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dtos/createFeedback.dto';
import { FeedbackEntity } from './entities/feedback.entity';
import { TicketEntity } from 'src/tickets/entities/ticket.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class UserFeedbackService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private feedbackRepository: Repository<FeedbackEntity>,
  ) {}

  async createFeedback(createFeedbackDto: CreateFeedbackDto): Promise<FeedbackEntity> {
    const feedback = this.feedbackRepository.create({
      user: { id: createFeedbackDto.user } as UserEntity,
      ticket: { id: createFeedbackDto.ticket } as TicketEntity,
      rating: createFeedbackDto.rating,
      comment: createFeedbackDto.comment,
    });
    return await this.feedbackRepository.save(feedback);
  }

  async getFeedbackByTicketId(ticketId: string): Promise<FeedbackEntity> {
    return await this.feedbackRepository.findOne({ where: { ticket: { id: ticketId } } });
  }
}