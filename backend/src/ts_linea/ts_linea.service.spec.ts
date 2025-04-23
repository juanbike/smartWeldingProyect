import { Test, TestingModule } from '@nestjs/testing';
import { TsLineaService } from './ts_linea.service';

describe('TsLineaService', () => {
  let service: TsLineaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsLineaService],
    }).compile();

    service = module.get<TsLineaService>(TsLineaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
