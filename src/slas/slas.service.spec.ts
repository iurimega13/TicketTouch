import { Test, TestingModule } from '@nestjs/testing';
import { SlasService } from './slas.service';

describe('SlasService', () => {
  let service: SlasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlasService],
    }).compile();

    service = module.get<SlasService>(SlasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
