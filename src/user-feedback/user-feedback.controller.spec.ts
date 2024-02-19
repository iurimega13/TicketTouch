import { Test, TestingModule } from '@nestjs/testing';
import { UserFeedbackController } from './user-feedback.controller';

describe('UserFeedbackController', () => {
  let controller: UserFeedbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFeedbackController],
    }).compile();

    controller = module.get<UserFeedbackController>(UserFeedbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
