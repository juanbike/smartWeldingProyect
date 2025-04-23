import { Test, TestingModule } from '@nestjs/testing';
import { TsTipoExtremoService } from './ts_tipo-extremo.service';

describe('TsTipoExtremoService', () => {
  let service: TsTipoExtremoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsTipoExtremoService],
    }).compile();

    service = module.get<TsTipoExtremoService>(TsTipoExtremoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
