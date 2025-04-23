/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TsEspecificacionService } from './ts_especificacion.service';
import { TsEspecificacionController } from './ts_especificacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TsEspecificacion } from '../ts_especificacion/entities/ts_especificacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TsEspecificacion])],
  controllers: [TsEspecificacionController],
  providers: [TsEspecificacionService],
  exports:[TsEspecificacionService],
})
export class TsEspecificacionModule {}
