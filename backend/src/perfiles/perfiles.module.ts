import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilesService } from './perfiles.service';
import { PerfilesController } from './perfiles.controller';
import { Perfile } from '../perfiles/entities/perfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perfile])],
  controllers: [PerfilesController],
  providers: [PerfilesService],
})
export class PerfilesModule {}
