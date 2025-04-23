/* eslint-disable prettier/prettier */
import 'dotenv/config'; // Carga las variables de .env al inicio (importante!)
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path'; // Para construir rutas de forma segura

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'Canela123$$',
  database: process.env.DB_DATABASE || 'juntas',
  entities: [
    join(__dirname, '..', '**', '*.entity.{ts,js}'), // Busca archivos .entity.ts o .entity.js en cualquier subdirectorio desde la raíz del proyecto (asumiendo que datasource está en src/database)
    // Alternativa: 'src/**/*.entity.{ts,js}' si ejecutas desde la raíz del proyecto
  ],
  migrations: [
    join(__dirname, 'migrations', '*.{ts,js}'), // Busca archivos .ts o .js directamente dentro de src/database/migrations
    // Alternativa: 'src/database/migrations/*.{ts,js}' si ejecutas desde la raíz

  ],


  // ¡MUY IMPORTANTE PARA PRODUCCIÓN!
  // synchronize: false indica que TypeORM NO intentará modificar el esquema
  // de la base de datos automáticamente basado en las entidades.
  // Debes usar migraciones para manejar los cambios de esquema.
  // Déjalo en 'false' si usas migraciones.
  // Podrías ponerlo en 'true' SOLO durante el desarrollo inicial si NO usas migraciones,
  // pero es una mala práctica a largo plazo.

  synchronize: process.env.NODE_ENV !== 'production', // Desactivar sincronización en producción

  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false, // Configuración SSL si es necesario
};

// Crear una instancia de DataSource con las opciones definidas
// y exportarla para su uso en otras partes de la aplicación
const dataSource = new DataSource(dataSourceOptions);
// Exporta la instancia para que la CLI pueda usarla en las migraciones
export default dataSource;
