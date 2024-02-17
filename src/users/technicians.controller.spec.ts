import { Test, TestingModule } from '@nestjs/testing';
import { TechniciansController } from './technicians.controller';

describe('TechniciansController', () => {
  let controller: TechniciansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechniciansController],
    }).compile();

    controller = module.get<TechniciansController>(TechniciansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
