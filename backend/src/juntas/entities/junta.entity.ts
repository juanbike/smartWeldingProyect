/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Inspector } from '../../inspectores/entities/inspectore.entity'
import { TsLinea } from '../../ts_linea/entities/ts_linea.entity'
import { TsEspecificacion } from '../../ts_especificacion/entities/ts_especificacion.entity';
import { Soldadore } from '../../soldadores/entities/soldadore.entity';
import { TsSchedule } from '../../ts_schedule/entities/ts_schedule.entity';
import { TsTipoExtremo } from '../../ts_tipo-extremo/entities/ts_tipoExtremo.entity';
import { TsMaterial } from '../../ts_material/entities/ts_material.entity';
import { TsTipoMaterial } from '../../ts_tipo-material/entities/ts_tipo-material.entity';
import { TsN1 } from '../../ts_n1/entities/ts_n1.entity';
import { TsN0 } from '../../ts_n0/entities/ts_n0.entity';

@Entity('junta')
export class Junta {
  @PrimaryGeneratedColumn('increment', { name: 'id_junta' })
  id: number;

  //Proyecto
  @ManyToOne(() => Proyecto, proyecto => proyecto.juntas)
  @JoinColumn({ name: 'id_proyecto' })
  proyectoID: Proyecto;

  
  //Inspector
  @ManyToOne(() => Inspector, inspector => inspector.juntas)
  @JoinColumn({ name: 'id_inspector' })
  inspectorID: Inspector;


  //Linea
  
  @ManyToOne(() => TsLinea, linea => linea.juntas)
  @JoinColumn({ name: 'id_linea'})
  lineaID: TsLinea;

  //Especificacion
  @ManyToOne(() => TsEspecificacion, tsespecificacion => tsespecificacion.juntas)
  @JoinColumn({ name: 'id_especificacion' })
  especificacionID: TsEspecificacion;

  //soldador
  @ManyToOne(() => Soldadore, soldador => soldador.juntas)
  @JoinColumn({ name: 'id_soldador' })
  soldadorID: Soldadore;

  //schedule
  @ManyToOne(() => TsSchedule, tsSchedule => tsSchedule.juntas)
  @JoinColumn({ name: 'id_tsSchedule' })
  tsScheduleID: TsSchedule;

  //TipoExtremo
  @ManyToOne(() => TsTipoExtremo, tsTipoExtremo => tsTipoExtremo.juntas)
  @JoinColumn({ name: 'id_tsTipoExtremo' })
  tsTipoExtremoID: TsTipoExtremo;

  //Material
  @ManyToOne(() => TsMaterial, tsMaterial => tsMaterial.juntas)
  @JoinColumn({ name: 'id_tsMaterial' })
  tsMaterialID: TsMaterial;

  //TsTipoMaterial
  @ManyToOne(() => TsTipoMaterial, tsTipoMaterial => tsTipoMaterial.juntas)
  @JoinColumn({ name: 'id_tsTipoMaterial' })
  tsTipoMaterialID: TsTipoMaterial;
  
  //N1
  @ManyToOne(() => TsN1, tsN1 => tsN1.juntas)
  @JoinColumn({ name: 'id_tsN1' })
  tsN1ID: TsN1;

  //N0
  @ManyToOne(() => TsN0, tsN0 => tsN0.juntas)
  @JoinColumn({ name: 'id_tsN0' })
  tsN0ID: TsN0;

  @CreateDateColumn({ name: 'create_at' })
  fecha: Date;

  @Column({ name: 'observaciones', type: 'text', nullable: true })
  observaciones: string;

  @Column({ name: 'pulgCont',type:'decimal', precision: 6, scale: 2,  nullable: false })
  pulgadascon: number;

  @Column({ name: 'factPulgDiame',type:'decimal', precision: 6, scale: 2,  nullable: false })
  facpuldia: number;

  @Column({ name: 'PulgDiame',type:'decimal', precision: 6, scale: 2,  nullable: false })
  pulgdia: number;



}
