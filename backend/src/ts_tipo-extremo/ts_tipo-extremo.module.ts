/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TsTipoExtremoService } from './ts_tipo-extremo.service';
import { TsTipoExtremoController } from './ts_tipo-extremo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TsTipoExtremo } from '../ts_tipo-extremo/entities/ts_tipoExtremo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TsTipoExtremo])],
  controllers: [TsTipoExtremoController],
  providers: [TsTipoExtremoService],
  exports:[TsTipoExtremoService],
})
export class TsTipoExtremoModule {}
