import { Test, TestingModule } from '@nestjs/testing';
import { TsEspecificacionController } from './ts_especificacion.controller';
import { TsEspecificacionService } from './ts_especificacion.service';

describe('TsEspecificacionController', () => {
  let controller: TsEspecificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsEspecificacionController],
      providers: [TsEspecificacionService],
    }).compile();

    controller = module.get<TsEspecificacionController>(TsEspecificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
