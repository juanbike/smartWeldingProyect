/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  }  from 'typeorm';
  @Entity({ name:'soldaduras' })

export class Soldadura {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'nro_junta', length: 6, nullable: false })
    nro_junta: string;
  
  
    @Column({ name: 'tipo', length: 10, nullable: false })
    tipo: string;
  
    @Column({ name: 'plano', length: 30, nullable: false })
    plano: string;
  
    @Column({ name: 'hoja', length: 15, nullable: false })
    hoja: string;
    
    @Column({ name: 'revision', length: 6, nullable: false })
    revision: string;
  
    @Column({ name: 'area', length: 10, nullable: false })
    area: string;
  
    @Column({ name: 'fase', length: 10, nullable: false })
    fase: string;
  
    @Column({ name: 'linea', length: 35, nullable: false })
    linea: string;
    
    @Column({ name: 'diametro', length: 6, nullable: false })
    diametro: string;

    @Column({ name: 'espesor', length: 4, nullable: false })
    espesor: string;

    @Column({ name: 'cedula', length: 4, nullable: false })
    cedula: string;

    @Column({ name: 'pn1', length: 10, nullable: false })
    pn1: string;

    @Column({ name: 'pn2', length: 10, nullable: false })
    pn2: string;

    @Column({ name: 'wds', length: 35, nullable: false })
    wps: string;

    
    @Column({ name: 'qrcode', type: 'text', nullable: true }) // Campo para almacenar el código QR como texto
    qrcode: string; // El código QR se almacenará como una cadena de texto


    @CreateDateColumn({ name: 'create_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
  
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;


}
