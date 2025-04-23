import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Junta } from 'src/juntas/entities/junta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaginacionService {
  constructor(
    @InjectRepository(Junta)
    private readonly itemRepository: Repository<Junta>,
  ) {}

  async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ data: Junta[]; totalRecords: number }> {
    const [data, totalRecords] = await this.itemRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { data, totalRecords };
  }
}
