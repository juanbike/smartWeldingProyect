/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoldaduraService } from './soldadura.service';
import { SoldaduraController } from './soldadura.controller';
import { Soldadura } from './entities/soldadura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Soldadura])],

  controllers: [SoldaduraController],
  providers: [SoldaduraService],
  exports: [ SoldaduraService ]
})
export class SoldaduraModule {}
