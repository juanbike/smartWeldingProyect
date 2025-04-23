import { Test, TestingModule } from '@nestjs/testing';
import { SoldaduraService } from './soldadura.service';

describe('SoldaduraService', () => {
  let service: SoldaduraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoldaduraService],
    }).compile();

    service = module.get<SoldaduraService>(SoldaduraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
