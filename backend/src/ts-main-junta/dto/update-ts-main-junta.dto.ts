import { PartialType } from '@nestjs/mapped-types';
import { CreateTsMainJuntaDto } from './create-ts-main-junta.dto';

export class UpdateTsMainJuntaDto extends PartialType(CreateTsMainJuntaDto) {}
