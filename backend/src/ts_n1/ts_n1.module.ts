import { Module } from '@nestjs/common';
import { TsN1Service } from './ts_n1.service';
import { TsN1Controller } from './ts_n1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TsN1 } from '../ts_n1/entities/ts_n1.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TsN1])],
  controllers: [TsN1Controller],
  providers: [TsN1Service],
  exports: [TsN1Service],
})
export class TsN1Module {}
