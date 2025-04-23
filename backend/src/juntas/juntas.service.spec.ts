import { Test, TestingModule } from '@nestjs/testing';
import { JuntasService } from './juntas.service';

describe('JuntasService', () => {
  let service: JuntasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JuntasService],
    }).compile();

    service = module.get<JuntasService>(JuntasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
