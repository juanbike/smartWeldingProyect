import { Test, TestingModule } from '@nestjs/testing';
import { TsN0Controller } from './ts_n0.controller';
import { TsN0Service } from './ts_n0.service';

describe('TsN0Controller', () => {
  let controller: TsN0Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsN0Controller],
      providers: [TsN0Service],
    }).compile();

    controller = module.get<TsN0Controller>(TsN0Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
