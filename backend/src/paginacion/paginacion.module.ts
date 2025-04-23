/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginacionService } from './paginacion.service';

import { PaginacionController } from './paginacion.controller';
import { Junta } from 'src/juntas/entities/junta.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Junta])],
  controllers: [PaginacionController],
  providers: [PaginacionService],
  exports:[PaginacionService]
})
export class PaginacionModule {}