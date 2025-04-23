import { Test, TestingModule } from '@nestjs/testing';
import { TsScheduleService } from './ts_schedule.service';

describe('TsScheduleService', () => {
  let service: TsScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsScheduleService],
    }).compile();

    service = module.get<TsScheduleService>(TsScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
