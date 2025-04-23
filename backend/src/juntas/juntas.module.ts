/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Junta } from './entities/junta.entity';
import { JuntaController } from './junta.controller';
import { JuntaService } from './juntas.services';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Inspector } from '../inspectores/entities/inspectore.entity';
import { TsLinea } from '../ts_linea/entities/ts_linea.entity';
import { TsEspecificacion } from '../ts_especificacion/entities/ts_especificacion.entity';
import { Soldadore } from '../soldadores/entities/soldadore.entity';
import { TsSchedule } from '../ts_schedule/entities/ts_schedule.entity';
import { TsTipoExtremo } from '../ts_tipo-extremo/entities/ts_tipoExtremo.entity';
import { TsMaterial } from '../ts_material/entities/ts_material.entity';
import { TsTipoMaterial } from '../ts_tipo-material/entities/ts_tipo-material.entity';
import { TsN1 } from '../ts_n1/entities/ts_n1.entity';
import { TsN0 } from '../ts_n0/entities/ts_n0.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Junta,
      Proyecto,
      Inspector,
      TsLinea,
      TsEspecificacion,
      Soldadore,
      TsSchedule,
      TsTipoExtremo,
      TsMaterial,
      TsTipoMaterial,
      TsN1,
      TsN0,
    ]),
  ],
  controllers: [JuntaController],
  providers: [JuntaService],
  exports: [JuntaService],
})
export class JuntasModule {}
