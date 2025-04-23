import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';

import { IsString, IsOptional, Length } from 'class-validator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
/**
 * Entidad que representa un tipo de usuario.
 * @property {number} id - Identificador único del tipo de usuario.
 * @property {string} name - Nombre único del tipo de usuario.
 * @property {string} description - Descripción opcional del tipo de usuario.
 * @property {UserType} parentType - Tipo de usuario padre (jerarquía).
 * @property {UserType[]} children - Tipos de usuario hijos (jerarquía).
 * @property {Date} createdAt - Fecha de creación del registro.
 * @property {Date} updatedAt - Fecha de la última actualización del registro.
 * @property {Date | null} deletedAt - Fecha de eliminación suave (null si no está eliminado).
 */
@Entity()
export class UserType {
  @PrimaryGeneratedColumn()
  id: number;

  // Cambié el nombre de la propiedad a "name" para que sea más descriptivo y fácil de entender.
  @Column({ unique: true })
  @Index() // Agrega un índice a la columna
  @IsString()
  @Length(3, 50) // Validación: El nombre debe tener entre 3 y 50 caracteres

  //Si la columna name es frecuentemente consultada o filtrada, considera agregar un índice para mejorar el rendimiento de las consultas:
  name: string;

  // Agrega una descripción opcional para el tipo de usuario.
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  // Relación uno a muchos: Un tipo de usuario puede tener muchos usuarios
  @OneToMany(() => Usuario, (user) => user.userType)
  users: Usuario[];

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date; // Cambiar a Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null; // Cambiar a Date | null (porque será null si no está borrado)
}

//`id`**: Identificador único para cada tipo de usuario.
// **`name`**: Nombre del tipo de usuario (por ejemplo, "Administrador", "Moderador").
// **`description`**: Descripción opcional del rol.
