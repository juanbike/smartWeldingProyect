import { PartialType } from '@nestjs/mapped-types';
import { CreateTsN1Dto } from './create-ts_n1.dto';

export class UpdateTsN1Dto extends PartialType(CreateTsN1Dto) {}
