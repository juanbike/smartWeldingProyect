import { Test, TestingModule } from '@nestjs/testing';
import { SoldaduraController } from './soldadura.controller';
import { SoldaduraService } from './soldadura.service';

describe('SoldaduraController', () => {
  let controller: SoldaduraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoldaduraController],
      providers: [SoldaduraService],
    }).compile();

    controller = module.get<SoldaduraController>(SoldaduraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
