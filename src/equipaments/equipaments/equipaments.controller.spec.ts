import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentsController } from './equipaments.controller';

describe('EquipamentsController', () => {
  let controller: EquipamentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipamentsController],
    }).compile();

    controller = module.get<EquipamentsController>(EquipamentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
