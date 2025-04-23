/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Logger
} from '@nestjs/common';


import { TsLineaService } from './ts_linea.service';
import { CreateTsLineaDto } from './dto/create-ts_linea.dto';
import { UpdateTsLineaDto } from './dto/update-ts_linea.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';



@Controller('api/linea')
export class TsLineaController {
  private readonly logger = new Logger(TsLineaController.name );
  [x: string]: any;
  constructor(private readonly tsLineaService: TsLineaService) {}

  @Post()
  create(@Body() createTsLineaDto: CreateTsLineaDto) {
    return this.tsLineaService.create(createTsLineaDto);
  }

  @Get()
  findAll() {
    return this.tsLineaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tsLineaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTsLineaDto: UpdateTsLineaDto) {
    return this.tsLineaService.update(+id, updateTsLineaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tsLineaService.remove(+id);
  }

  @Post('upload')
@UseInterceptors(FileInterceptor('File', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    }
  })
}))
async uploadData(@UploadedFile() file: Express.Multer.File): Promise<{ message: string }> {
  try {
    if (!file) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Archivo no proporcionado',
      }, HttpStatus.BAD_REQUEST);
    }
    await this.tsLineaService.readExcelAndSave(file.path);
    return { message: 'La tabla se creó en la base de datos' };
  } catch (error) {
    throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: 'Error al procesar el archivo',
    }, HttpStatus.BAD_REQUEST);
  }
}


/*
1- @UseInterceptors(FileInterceptor('file', { ... })): Este decorador aplica el interceptor FileInterceptor de NestJS, que utiliza multer para manejar la subida de archivos.
2- 'file': Nombre del campo en el formulario que contiene el archivo.
3- storage: diskStorage({ ... }): Configura el almacenamiento del archivo usando diskStorage:
4- destination: './uploads': Especifica el directorio donde se guardarán los archivos subidos.
5- filename: (req, file, cb) => { ... }: Define una función para generar el nombre del archivo:
6- const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join(''): Genera un nombre aleatorio de 32 caracteres en formato hexadecimal.
7- cb(null, ${randomName}${extname(file.originalname)}): Usa el nombre aleatorio generado y conserva la extensión original del archivo.
METODO UPLOADPDATA

1- async uploadData(@Body('filePath') filePath: string): Promise<{ message: string }>: Define un método asíncrono uploadData que recibe un parámetro filePath 
del cuerpo de la solicitud (aunque, en este caso, la funcionalidad de subida del archivo parece no estar usando directamente este parámetro para procesar el
 archivo subido. Podría haber una confusión entre subir el archivo y leer la ruta del cuerpo).
2- @Body('filePath') filePath: string: Extrae el valor del campo filePath del cuerpo de la solicitud.

3- try { ... } catch (error) { ... }: Maneja errores que pueden ocurrir al procesar el archivo:
await this.proyectosService.readExcelAndSave(filePath): Llama al método readExcelAndSave del servicio proyectosService para procesar el archivo Excel ubicado 
en filePath.
return { message: 'La tabla se creo en la base de datos' }: Devuelve un mensaje de éxito si el archivo se procesa correctamente.
catch (error) { ... }: Si ocurre un error, lanza una excepción HTTP con estado BAD_REQUEST y un mensaje de error.

*/

@Delete()
  async deleteAllData() {
    this.logger.log('Received request to delete all data');
    try {
      await this.tsLineaService.deleteAllData();
      this.logger.log('All data deleted successfully');
      return { message: 'Todos los datos han sido eliminados' };
    } catch (error) {
      this.logger.error('Error deleting all data', error.stack);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'No se pudieron eliminar los datos',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
