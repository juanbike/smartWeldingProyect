import { Module } from '@nestjs/common';
import { TsMainJuntaService } from './ts-main-junta.service';
import { TsMainJuntaController } from './ts-main-junta.controller';

@Module({
  controllers: [TsMainJuntaController],
  providers: [TsMainJuntaService],
})
export class TsMainJuntaModule {}
