import { Test, TestingModule } from '@nestjs/testing';
import { TsEspecificacionService } from './ts_especificacion.service';

describe('TsEspecificacionService', () => {
  let service: TsEspecificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsEspecificacionService],
    }).compile();

    service = module.get<TsEspecificacionService>(TsEspecificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
