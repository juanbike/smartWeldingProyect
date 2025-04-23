import { Test, TestingModule } from '@nestjs/testing';
import { TsScheduleController } from './ts_schedule.controller';
import { TsScheduleService } from './ts_schedule.service';

describe('TsScheduleController', () => {
  let controller: TsScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsScheduleController],
      providers: [TsScheduleService],
    }).compile();

    controller = module.get<TsScheduleController>(TsScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
