/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TsLineaService } from './ts_linea.service';
import { TsLineaController } from './ts_linea.controller';
import { TsLinea } from '../ts_linea/entities/ts_linea.entity';
@Module({
  imports:[TypeOrmModule.forFeature([TsLinea])],
  controllers: [TsLineaController],
  providers: [TsLineaService],
  exports:[TsLineaService]
})
export class TsLineaModule {}
