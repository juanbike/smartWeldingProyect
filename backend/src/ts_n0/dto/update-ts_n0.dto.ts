import { PartialType } from '@nestjs/mapped-types';
import { CreateTsN0Dto } from './create-ts_n0.dto';

export class UpdateTsN0Dto extends PartialType(CreateTsN0Dto) {}
