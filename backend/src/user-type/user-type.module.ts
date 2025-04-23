import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeService } from './user-type.service';
import { UserTypeController } from './user-type.controller';
import { UserType } from './entities/user-type.entity';

// Importa el módulo TypeOrmModule y el UserTypeService y UserTypeController de los archivos correspondientes en la carpeta src/user-type.
// Define el módulo UserTypeModule y lo exporta. Se encarga de importar el módulo TypeOrmModule y los controladores y servicios de UserType.
@Module({
  imports: [TypeOrmModule.forFeature([UserType])],
  controllers: [UserTypeController],
  providers: [UserTypeService],
})
export class UserTypeModule {}
