import { Test, TestingModule } from '@nestjs/testing';
import { TsN1Controller } from './ts_n1.controller';
import { TsN1Service } from './ts_n1.service';

describe('TsN1Controller', () => {
  let controller: TsN1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsN1Controller],
      providers: [TsN1Service],
    }).compile();

    controller = module.get<TsN1Controller>(TsN1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
