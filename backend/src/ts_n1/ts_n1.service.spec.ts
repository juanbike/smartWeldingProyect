import { Test, TestingModule } from '@nestjs/testing';
import { TsN1Service } from './ts_n1.service';

describe('TsN1Service', () => {
  let service: TsN1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsN1Service],
    }).compile();

    service = module.get<TsN1Service>(TsN1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
