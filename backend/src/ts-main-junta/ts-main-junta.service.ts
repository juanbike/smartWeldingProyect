import { Injectable } from '@nestjs/common';
import { CreateTsMainJuntaDto } from './dto/create-ts-main-junta.dto';
import { UpdateTsMainJuntaDto } from './dto/update-ts-main-junta.dto';

@Injectable()
export class TsMainJuntaService {
  create(createTsMainJuntaDto: CreateTsMainJuntaDto) {
    return 'This action adds a new tsMainJunta';
  }

  findAll() {
    return `This action returns all tsMainJunta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tsMainJunta`;
  }

  update(id: number, updateTsMainJuntaDto: UpdateTsMainJuntaDto) {
    return `This action updates a #${id} tsMainJunta`;
  }

  remove(id: number) {
    return `This action removes a #${id} tsMainJunta`;
  }
}
