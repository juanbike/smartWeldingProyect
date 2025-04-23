/* eslint-disable prettier/prettier */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection} from 'typeorm';
import { Junta } from './entities/junta.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Inspector } from '../inspectores/entities/inspectore.entity';
import { TsLinea } from '../ts_linea/entities/ts_linea.entity';
import { TsEspecificacion } from '../ts_especificacion/entities/ts_especificacion.entity';
import { Soldadore } from '../soldadores/entities/soldadore.entity';
import { CreateJuntaDto } from './dto/create-junta.dto';
import { TsSchedule } from '../ts_schedule/entities/ts_schedule.entity';
import { TsTipoExtremo } from '../ts_tipo-extremo/entities/ts_tipoExtremo.entity';
import { TsMaterial } from '../ts_material/entities/ts_material.entity';
import { TsTipoMaterial } from '../ts_tipo-material/entities/ts_tipo-material.entity';
import { TsN1 } from '../ts_n1/entities/ts_n1.entity';
import { TsN0 } from '../ts_n0/entities/ts_n0.entity';




@Injectable()
export class JuntaService {
  private readonly logger = new Logger(JuntaService.name);
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Junta)
    private readonly juntaRepository: Repository<Junta>,
   
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,

    @InjectRepository(Inspector)
    private readonly inspectorRepository: Repository<Inspector>,
    
    @InjectRepository(TsLinea)
    private readonly tsLineaRepository: Repository<TsLinea>,
   
    @InjectRepository(TsEspecificacion)
    private readonly tsEspecificacionRepository: Repository<TsEspecificacion>,
    
    @InjectRepository(Soldadore)
    private readonly soldadoreRepository: Repository<Soldadore>,

    @InjectRepository(TsSchedule)
    private readonly tsScheduleRepository: Repository<TsSchedule>,

    @InjectRepository(TsTipoExtremo)
    private readonly tsTipoExtremoRepository: Repository<TsTipoExtremo>,

    @InjectRepository(TsMaterial)
    private readonly tsMaterialRepository: Repository<TsMaterial>,

    @InjectRepository(TsTipoMaterial)
    private readonly tsTipoMaterialRepository: Repository<TsTipoMaterial>,

    @InjectRepository(TsN1)
    private readonly tsN1Repository: Repository<TsN1>,

    @InjectRepository(TsN0)
    private readonly tsN0Repository: Repository<TsN0>,
  ) {}

  async createJunta(data: CreateJuntaDto): Promise<Junta> {
    return await this.connection.transaction(async (manager) => {
      //Proyecto
      const proyecto = await manager.findOne(Proyecto, {
        where: { id: data.proyectoID },
      });
      if (!proyecto) {
        throw new NotFoundException('Proyecto no encontrado');
      }
      //Inspector
      const inspector = await manager.findOne(Inspector, {
        where: { id: data.inspectorID },
      });
      if (!inspector) {
        throw new NotFoundException('Inspector no encontrado');
      }
      //Linea
      const linea = await manager.findOne(TsLinea, {
        where: { id: data.lineaID },
      });
      if (!linea) {
        throw new NotFoundException('Linea no encontrada');
      }
      //Especificacion
      const especificacion = await manager.findOne(TsEspecificacion, {
        where: { id: data.especificacionID },
      });
      if (!especificacion) {
        throw new NotFoundException('Especificacion no encontrada');
      }
      //soldador
      const soldador = await manager.findOne(Soldadore, {
        where: { id: data.soldadorID },
      });
      if (!soldador) {
        throw new NotFoundException('Soldador no encontrado');
      }
      //tsSchedule
      const tsSchedule = await manager.findOne(TsSchedule, {
        where: { id: data.tsScheduleID },
      });
      if (!tsSchedule) {
        throw new NotFoundException('tsSchedule no encontrado');
      }
      //tsTipoExtremo
      const tsTipoExtremo = await manager.findOne(TsTipoExtremo, {
        where: { id: data.tsTipoExtremoID },
      });
      if (!tsTipoExtremo) {
        throw new NotFoundException('tsTipoExtremo no encontrado');
      }
      //tsMaterial
      const tsMaterial = await manager.findOne(TsMaterial, {
        where: { id: data.tsMaterialID },
      });
      if (!tsMaterial) {
        throw new NotFoundException('tsMaterial no encontrado');
      }
      //tsTipoMaterial
      const tsTipoMaterial = await manager.findOne(TsTipoMaterial, {
        where: { id: data.tsTipoMaterialID },
      });
      if (!tsTipoMaterial) {
        throw new NotFoundException('tsTipoMaterial no encontrado');
      }
      //tsN1
      const tsN1 = await manager.findOne(TsN1, {
        where: { id: data.tsN1ID },
      });
      if (!tsN1) {
        throw new NotFoundException('tsN1 no encontrado');
      }
      //tsN0
      const tsN0 = await manager.findOne(TsN0, {
        where: { id: data.tsN0ID },
      });
      if (!tsN0) {
        throw new NotFoundException('tsN0 no encontrado');
      }


      const junta = new Junta();
      junta.proyectoID = proyecto;
      junta.inspectorID = inspector;
      junta.lineaID = linea;
      junta.especificacionID = especificacion;
      junta.soldadorID = soldador;
      junta.tsScheduleID = tsSchedule;
      junta.tsTipoExtremoID = tsTipoExtremo
      junta.tsMaterialID = tsMaterial;
      junta.tsTipoMaterialID = tsTipoMaterial;
      junta.tsN1ID = tsN1;
      junta.tsN0ID = tsN0;
      junta.fecha = new Date(data.fecha);
      junta.observaciones = data.observaciones;
      junta.pulgdia = data.pulgdia;
      junta.pulgadascon = data.pulgadascon;
      junta.facpuldia = data.facpuldia;

      return await manager.save(junta);
    });
  }


    //Recupera las juntas por ProyectoID
    async getJuntasByProyectoId(proyectoId: number): Promise<Junta[]> {
      console.log('proyectoId recibido en el servicio:', proyectoId);
  if (!proyectoId) {
    throw new Error('El proyectoId es undefined');
  }
      return this.juntaRepository.find({
        where: { proyectoID: { id: proyectoId } },
        relations: ['proyectoID', 'inspectorID', 'lineaID', 'soldadorID'],
        select: ['id', 'proyectoID', 'inspectorID', 'lineaID', 'especificacionID','soldadorID'], 
        order: {
          id: 'ASC',
        }
      });
    }
  
  
    //Recupera las juntas por SoldadorID
    async getJuntasBySoldadorId(soldadorId: number): Promise<Junta[]> {
      console.log('soldadorId recibido en el servicio:', soldadorId);
  if (!soldadorId) {
    throw new Error('El soldadorId es undefined');
  }
      return this.juntaRepository.find({
        where: { soldadorID: { id: soldadorId } },
        relations: [ 'lineaID', 'especificacionID', 'tsScheduleID', 'tsTipoExtremoID', 'tsMaterialID', 'tsTipoMaterialID'], //6
        //select: ['id', 'proyectoID', 'inspectorID', 'lineaID.linea', 'especificacionID','soldadorID'], //7
               order: {
          id: 'ASC',
        }
      });
    }

    /*
    Entiendo, aquí te explico el código que me proporcionaste:

Este código es una función asíncrona llamada `getJuntasBySoldadorId` que pertenece a un servicio. La función recibe un parámetro `soldadorId` de tipo `number` y devuelve una promesa que resuelve a
 un arreglo de objetos `Junta`.

Veamos el código paso a paso:

1. La función comienza imprimiendo en la consola el valor del `soldadorId` recibido.
2. Luego, se verifica si el `soldadorId` es `undefined`. Si es así, se lanza un error con el mensaje "El soldadorId es undefined".
3. Si el `soldadorId` es válido, se utiliza el repositorio `juntaRepository` para realizar una consulta a la base de datos.
4. La consulta se realiza utilizando el método `find()` del repositorio, el cual devuelve un arreglo de objetos `Junta`.
5. En la consulta, se filtran los registros donde el `soldadorID.id` coincide con el `soldadorId` proporcionado.
6. Se solicita que se carguen las relaciones con las entidades `proyectoID`, `inspectorID`, `lineaID` y `especificacionID`.
7. Se seleccionan los campos `id`, `proyectoID`, `inspectorID`, `lineaID`, `especificacionID` y `soldadorID` de los registros.
8. Finalmente, se ordena el resultado por el campo `id` en orden ascendente.

En resumen, esta función recupera todas las juntas (registros) de la base de datos que están asociadas a un soldador específico, incluyendo información de las entidades relacionadas, y las devuelve en un arreglo.
    */






    //Recupera las juntas por InspectorID
    async getJuntasByInspectorId(inspectorId: number): Promise<Junta[]> {
      console.log('inspectorId recibido en el servicio:', inspectorId);
  if (!inspectorId) {
    throw new Error('El inspectorId es undefined');
  }
      return this.juntaRepository.find({
        where: { inspectorID: { id: inspectorId } },
        relations: ['proyectoID', 'lineaID', 'especificacionID','soldadorID'],
        select: ['id', 'proyectoID', 'inspectorID', 'lineaID', 'especificacionID','soldadorID'],
        order: {
          id: 'ASC',
        }
      });
    }
 
    //hacer una consulta por soldador que solo muestre los materiales consumidos: linea, especificacion, schedule, tipo extremo, tipo material, material
    // y que lo ordene por tipo material y lo totalice por tipo material
    async getMaterialesConsumidosPorSoldador(soldadorId: number) {
      const materiales = await this.juntaRepository.createQueryBuilder('junta')
        .leftJoinAndSelect('junta.proyectoID','proyecto')
        .leftJoinAndSelect('junta.inspectorID','inspector')
        .leftJoinAndSelect('junta.lineaID','linea')
        .leftJoinAndSelect('junta.especificacionID', 'especificacion')
        .leftJoinAndSelect('junta.soldadorID','soldador')
        .leftJoinAndSelect('junta.tsScheduleID', 'schedule') // Asume que existe una relación tsScheduleID
        .leftJoinAndSelect('junta.tsTipoExtremoID', 'tipoExtremo') // Asume que existe una relación tsTipoExtremoID
        .leftJoinAndSelect('junta.tsMaterialID', 'material') // Asume que existe una relación tsMaterialID
        //.leftJoinAndSelect('junta.tsTipoMaterialID', 'tipoMaterial')
        .leftJoinAndSelect('junta.tsN0ID', 'N0')// Asume que existe una relación tsN0ID
        .leftJoinAndSelect('junta.tsN1ID', 'N1') // Asume que existe una relación tsN1ID
        .where('junta.soldadorID = :soldadorId', { soldadorId })
        .select([
          //'tipoMaterial.nombre AS tipoMaterialNombre',
          'soldador.nombre AS soldadorNombre',
          'soldador.apellido AS soldadorApellido',
          'soldador.telefono AS soldadorTelefono',
          'linea.linea AS lineaNombre',
          'schedule.schedule AS scheduleNombre',
          'schedule.tipo AS scheduleTipo',
          'tipoExtremo.tipoExtremo AS tipoExtremoNombre',
          'tipoExtremo.tipo AS tipoExtremoTipo',
          'material.material AS materialNombre',
          'material.tipo AS materialTipo',
          
        ])
        .orderBy('material.material', 'ASC')
        .getRawMany();
  
      // Agrupar por Material y totalizar
      const totalizados = materiales.reduce((acc, curr) => {
        const { materialNombre, materialTipo,soldadorNombre, soldadorApellido, soldadorTelefono, lineaNombre, scheduleNombre, scheduleTipo ,tipoExtremoNombre, tipoExtremoTipo  } = curr;
        if (!acc[materialNombre]) {
          acc[materialNombre] = {
            materialNombre,
            total: 0,
            detalles: []
          };
        }
        acc[materialNombre].total += 1;
        acc[materialNombre].detalles.push({
          materialNombre,
          materialTipo,
          lineaNombre,
          soldadorNombre,
          soldadorApellido,
          soldadorTelefono,
          scheduleNombre,
          scheduleTipo,
          tipoExtremoNombre,
          tipoExtremoTipo,
        });
        return acc;
      }, {});
      console.log('totalizados:', totalizados);
      return totalizados;
    }








}// Fin de la clase
