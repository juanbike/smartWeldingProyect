import { Test, TestingModule } from '@nestjs/testing';
import { SoldadoresService } from './soldadores.service';

describe('SoldadoresService', () => {
  let service: SoldadoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoldadoresService],
    }).compile();

    service = module.get<SoldadoresService>(SoldadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
