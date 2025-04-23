import { Test, TestingModule } from '@nestjs/testing';
import { TsLineaController } from './ts_linea.controller';
import { TsLineaService } from './ts_linea.service';

describe('TsLineaController', () => {
  let controller: TsLineaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsLineaController],
      providers: [TsLineaService],
    }).compile();

    controller = module.get<TsLineaController>(TsLineaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
