import { Module } from '@nestjs/common';
import { TsN0Service } from './ts_n0.service';
import { TsN0Controller } from './ts_n0.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TsN0 } from '../ts_n0/entities/ts_n0.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TsN0])],
  controllers: [TsN0Controller],
  providers: [TsN0Service],
  exports: [TsN0Service],
})
export class TsN0Module {}
