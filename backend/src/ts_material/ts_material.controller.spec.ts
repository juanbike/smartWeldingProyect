import { Test, TestingModule } from '@nestjs/testing';
import { TsMaterialController } from './ts_material.controller';
import { TsMaterialService } from './ts_material.service';

describe('TsMaterialController', () => {
  let controller: TsMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsMaterialController],
      providers: [TsMaterialService],
    }).compile();

    controller = module.get<TsMaterialController>(TsMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
