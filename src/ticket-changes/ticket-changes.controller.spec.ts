import { Test, TestingModule } from '@nestjs/testing';
import { TicketChangesController } from './ticket-changes.controller';

describe('TicketChangesController', () => {
  let controller: TicketChangesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketChangesController],
    }).compile();

    controller = module.get<TicketChangesController>(TicketChangesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
