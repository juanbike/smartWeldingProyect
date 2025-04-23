/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateTsScheduleDto } from './create-ts_schedule.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTsScheduleDto extends PartialType(CreateTsScheduleDto) {
    @IsNotEmpty()
    @IsString()
    schedule: string;

    @IsNotEmpty()
    @IsString()
    tipo: string;
}
