import { Test, TestingModule } from '@nestjs/testing';
import { PaginacionService } from './paginacion.service';

describe('PaginacionService', () => {
  let service: PaginacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginacionService],
    }).compile();

    service = module.get<PaginacionService>(PaginacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
