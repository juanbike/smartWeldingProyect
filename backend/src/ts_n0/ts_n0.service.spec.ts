import { Test, TestingModule } from '@nestjs/testing';
import { TsN0Service } from './ts_n0.service';

describe('TsN0Service', () => {
  let service: TsN0Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsN0Service],
    }).compile();

    service = module.get<TsN0Service>(TsN0Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
