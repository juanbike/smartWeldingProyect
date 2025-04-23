import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { PaginacionService } from './paginacion.service';

@Controller('api/paginacion')
export class PaginacionController {
  constructor(private readonly paginacionService: PaginacionService) {}

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
  ) {
    return this.paginacionService.findAll(page, pageSize);
  }
}
