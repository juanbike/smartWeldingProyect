import { Test, TestingModule } from '@nestjs/testing';
import { PaginacionController } from './paginacion.controller';

describe('PaginacionController', () => {
  let controller: PaginacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaginacionController],
    }).compile();

    controller = module.get<PaginacionController>(PaginacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
