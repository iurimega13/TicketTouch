import { Test, TestingModule } from '@nestjs/testing';
import { TicketChangesService } from './ticket-changes.service';

describe('TicketChangesService', () => {
  let service: TicketChangesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketChangesService],
    }).compile();

    service = module.get<TicketChangesService>(TicketChangesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
