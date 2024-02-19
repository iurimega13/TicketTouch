import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentsService } from './departaments.service';

describe('DepartamentsService', () => {
  let service: DepartamentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartamentsService],
    }).compile();

    service = module.get<DepartamentsService>(DepartamentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
