import { Test, TestingModule } from '@nestjs/testing';
import { TsTipoExtremoController } from './ts_tipo-extremo.controller';
import { TsTipoExtremoService } from './ts_tipo-extremo.service';

describe('TsTipoExtremoController', () => {
  let controller: TsTipoExtremoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsTipoExtremoController],
      providers: [TsTipoExtremoService],
    }).compile();

    controller = module.get<TsTipoExtremoController>(TsTipoExtremoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
