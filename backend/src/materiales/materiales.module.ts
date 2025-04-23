import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialesService } from './materiales.service';
import { MaterialesController } from './materiales.controller';
import { Materiales } from './entities/materiale.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Materiales])],

  controllers: [MaterialesController],
  providers: [MaterialesService],
  exports: [MaterialesService],
})
export class MaterialesModule {}
