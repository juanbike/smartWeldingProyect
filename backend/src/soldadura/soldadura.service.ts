/* eslint-disable @typescript-eslint/no-unused-vars */
import * as qr from 'qrcode'; // Importa la librería para generar códigos QR
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSoldaduraDto } from './dto/create-soldadura.dto';
import { UpdateSoldaduraDto } from './dto/update-soldadura.dto';
import { Soldadura } from '../soldadura/entities/soldadura.entity';

@Injectable()
export class SoldaduraService {
  constructor(
    @InjectRepository(Soldadura)
    private readonly soldadaduraRepository: Repository<Soldadura>,
  ) {}

  //Función para crear una nueva soldadura
  async create(createSoldaduraDto: CreateSoldaduraDto): Promise<Soldadura> {
    const nuevaSoldadura = Object.assign(new Soldadura(), createSoldaduraDto);

    const qrCodeData = JSON.stringify(createSoldaduraDto);
    const qrCodeUrl = await this.generateQrCode(qrCodeData);

    nuevaSoldadura.qrcode = qrCodeUrl;

    return this.soldadaduraRepository.save(nuevaSoldadura);
  }

  private generateQrCode(data: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      qr.toDataURL(data, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  }

  // buscar todas las soldadoras

  async findAll(): Promise<Soldadura[]> {
    return await this.soldadaduraRepository.find();
  }

  // buscar una soldadura por su ID
  async findById(id: number): Promise<Soldadura> {
    const soldadura = await this.soldadaduraRepository.findOneBy({ id: id });

    if (!soldadura) {
      throw new NotFoundException(
        `El soldador con el ID ${id} no se encuentra`,
      );
    }

    return soldadura;
  }

  // actualizar una soldadura y generar el código QR actualizado
  async update(
    id: number,
    updateSoldaduraDto: UpdateSoldaduraDto,
  ): Promise<Soldadura> {
    const soldadura = await this.soldadaduraRepository.findOneBy({ id });

    if (!soldadura) {
      throw new NotFoundException(
        `La soldadura con el ID ${id} no se encontró.`,
      );
    }

    // Actualizar los datos de la soldadura con los del DTO
    Object.assign(soldadura, updateSoldaduraDto);

    // Generar el código QR actualizado
    const qrCodeUrl = await this.generateQrCode(
      JSON.stringify(updateSoldaduraDto),
    );

    // Asignar el nuevo código QR a la soldadura
    soldadura.qrcode = qrCodeUrl;

    // Guardar los cambios en la base de datos
    return this.soldadaduraRepository.save(soldadura);
  }

  // borrar una soldadura
  async remove(id: number): Promise<void> {
    const soldadura = await this.soldadaduraRepository.findOneBy({ id: id });

    if (!soldadura) {
      throw new NotFoundException(
        `El soldador con el ID ${id} no se encuentra`,
      );
    }

    await this.soldadaduraRepository.remove(soldadura);
  }
}
