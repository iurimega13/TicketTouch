import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentsController } from './departaments.controller';

describe('DepartamentsController', () => {
  let controller: DepartamentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartamentsController],
    }).compile();

    controller = module.get<DepartamentsController>(DepartamentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
