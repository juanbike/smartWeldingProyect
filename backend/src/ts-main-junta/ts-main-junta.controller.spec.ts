import { Test, TestingModule } from '@nestjs/testing';
import { TsMainJuntaController } from './ts-main-junta.controller';
import { TsMainJuntaService } from './ts-main-junta.service';

describe('TsMainJuntaController', () => {
  let controller: TsMainJuntaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsMainJuntaController],
      providers: [TsMainJuntaService],
    }).compile();

    controller = module.get<TsMainJuntaController>(TsMainJuntaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
