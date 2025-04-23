import { Test, TestingModule } from '@nestjs/testing';
import { JuntasController } from './juntas.controller';
import { JuntasService } from './juntas.service';

describe('JuntasController', () => {
  let controller: JuntasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JuntasController],
      providers: [JuntasService],
    }).compile();

    controller = module.get<JuntasController>(JuntasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
