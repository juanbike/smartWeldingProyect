/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    UpdateDateColumn,
    DeleteDateColumn
  } from 'typeorm';
  
 

  // Establecemos la bidireccinalidad

  import { Usuario } from '../../usuarios/entities/usuario.entity'
  @Entity({ name:'perfiles' })
  export class Perfile {
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    correo: string;
  
      
  @Column({ name: 'telefono1', length: 25, nullable: false })
  telefono: string;

  @Column({ name: 'rol', length: 35, nullable: false })
  rol: string;


  @Column({ name: 'password', length: 35, nullable: false })
  password: string;

  //@OneToOne( () => Usuario, (user) => user.perfiles) //1- Cual es la entidad de la relacion:() => Usuario -2 Cual campo de la tabla user tiene la relacion?(user) => user.perfiles
  //usuario: Usuario


  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
  }
  
