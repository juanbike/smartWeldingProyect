import { Test, TestingModule } from '@nestjs/testing';
import { InspectoresService } from './inspectores.service';

describe('InspectoresService', () => {
  let service: InspectoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspectoresService],
    }).compile();

    service = module.get<InspectoresService>(InspectoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
