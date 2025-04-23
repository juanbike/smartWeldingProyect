import { Test, TestingModule } from '@nestjs/testing';
import { TsTipoMaterialController } from './ts_tipo-material.controller';
import { TsTipoMaterialService } from './ts_tipo-material.service';

describe('TsTipoMaterialController', () => {
  let controller: TsTipoMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsTipoMaterialController],
      providers: [TsTipoMaterialService],
    }).compile();

    controller = module.get<TsTipoMaterialController>(TsTipoMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
