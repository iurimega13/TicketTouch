import { Test, TestingModule } from '@nestjs/testing';
import { UserFeedbackService } from './user-feedback.service';

describe('UserFeedbackService', () => {
  let service: UserFeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFeedbackService],
    }).compile();

    service = module.get<UserFeedbackService>(UserFeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
