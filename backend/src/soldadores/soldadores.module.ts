/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoldadoresService } from './soldadores.service';
import { SoldadoresController } from './soldadores.controller';
import { Soldadore } from './entities/soldadore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Soldadore])],
  controllers: [SoldadoresController],
  providers: [SoldadoresService],
  exports: [SoldadoresService],
})
export class SoldadoresModule {}
