/* eslint-disable prettier/prettier */
import { UserType } from 'src/user-type/entities/user-type.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

//1- importamos la entidad para la relacion

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre', length: 25, nullable: false })
  nombre: string;

  @Column({ name: 'apellido', length: 25, nullable: false })
  apellido: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ name: 'user_type_id', nullable: true })
  userTypeId: number;

  // Relación muchos a uno: Un usuario pertenece a un tipo de usuario
  @ManyToOne(() => UserType, (userType) => userType.users, { nullable: true })
  userType: UserType;

  //Establecemos la bidireccionalidad en la otra entidad, vamos a la otra entidad: perfiles

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
