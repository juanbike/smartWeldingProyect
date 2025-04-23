import { Test, TestingModule } from '@nestjs/testing';
import { InspectoresController } from './inspectores.controller';
import { InspectoresService } from './inspectores.service';

describe('InspectoresController', () => {
  let controller: InspectoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectoresController],
      providers: [InspectoresService],
    }).compile();

    controller = module.get<InspectoresController>(InspectoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
