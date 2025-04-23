import { Test, TestingModule } from '@nestjs/testing';
import { TsTipoMaterialService } from './ts_tipo-material.service';

describe('TsTipoMaterialService', () => {
  let service: TsTipoMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsTipoMaterialService],
    }).compile();

    service = module.get<TsTipoMaterialService>(TsTipoMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
