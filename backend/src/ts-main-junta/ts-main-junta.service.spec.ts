import { Test, TestingModule } from '@nestjs/testing';
import { TsMainJuntaService } from './ts-main-junta.service';

describe('TsMainJuntaService', () => {
  let service: TsMainJuntaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsMainJuntaService],
    }).compile();

    service = module.get<TsMainJuntaService>(TsMainJuntaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
