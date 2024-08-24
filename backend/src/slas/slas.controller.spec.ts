import { Test, TestingModule } from '@nestjs/testing';
import { SlasController } from './slas.controller';

describe('SlasController', () => {
  let controller: SlasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlasController],
    }).compile();

    controller = module.get<SlasController>(SlasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
