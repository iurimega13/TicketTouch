import { Test, TestingModule } from '@nestjs/testing';
import { FaqsController } from './faqs.controller';

describe('FaqsController', () => {
  let controller: FaqsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaqsController],
    }).compile();

    controller = module.get<FaqsController>(FaqsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
