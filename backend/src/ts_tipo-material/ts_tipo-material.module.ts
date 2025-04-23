/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TsTipoMaterialService } from './ts_tipo-material.service';
import { TsTipoMaterialController } from './ts_tipo-material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TsTipoMaterial } from './entities/ts_tipo-material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TsTipoMaterial])],
  controllers: [TsTipoMaterialController],
  providers: [TsTipoMaterialService],
  exports:[TsTipoMaterialService],
})
export class TsTipoMaterialModule {}
