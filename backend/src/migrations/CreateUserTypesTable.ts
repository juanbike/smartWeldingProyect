import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTypesTable1712345678900 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user_type (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insertar los tipos de usuario iniciales
    await queryRunner.query(`
      INSERT INTO user_type (name, description) VALUES
      ('Administrador', 'Acceso total al sistema'),
      ('Inspector', 'Realiza inspecciones y revisiones'),
      ('Soldador', 'Personal especializado en soldadura'),
      ('Gerente', 'Gestiona equipos y proyectos'),
      ('Operador', 'Opera maquinaria y equipos');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user_type`);
  }
}
