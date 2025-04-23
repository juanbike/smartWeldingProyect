import { Module } from '@nestjs/common';
import { TsMaterialService } from './ts_material.service';
import { TsMaterialController } from './ts_material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TsMaterial } from '../ts_material/entities/ts_material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TsMaterial])],
  controllers: [TsMaterialController],
  providers: [TsMaterialService],
  exports: [TsMaterialService],
})
export class TsMaterialModule {}
