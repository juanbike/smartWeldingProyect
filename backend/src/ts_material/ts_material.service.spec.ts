import { Test, TestingModule } from '@nestjs/testing';
import { TsMaterialService } from './ts_material.service';

describe('TsMaterialService', () => {
  let service: TsMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsMaterialService],
    }).compile();

    service = module.get<TsMaterialService>(TsMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
