import { Module } from '@nestjs/common';
import { TsScheduleService } from './ts_schedule.service';
import { TsScheduleController } from './ts_schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TsSchedule } from './entities/ts_schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TsSchedule])],
  controllers: [TsScheduleController],
  providers: [TsScheduleService],
  exports: [TsScheduleService],
})
export class TsScheduleModule {}
