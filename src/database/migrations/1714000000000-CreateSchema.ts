import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchema1714000000000 implements MigrationInterface {
  name = 'CreateSchema1714000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`users\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,

        \`email\` varchar(150) NOT NULL,
        \`username\` varchar(50) NOT NULL,
        \`password_hash\` varchar(255) NOT NULL,
        \`role\` enum('admin','user') NOT NULL DEFAULT 'user',
        \`is_active\` tinyint NOT NULL DEFAULT 1,

        \`reset_password_token\` varchar(255) NULL,
        \`reset_password_expires_at\` datetime NULL,

        UNIQUE INDEX \`IDX_USERS_EMAIL\` (\`email\`),
        UNIQUE INDEX \`IDX_USERS_USERNAME\` (\`username\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE \`categories\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,

        \`name\` varchar(120) NOT NULL,
        \`slug\` varchar(150) NOT NULL,
        \`description\` varchar(255) NULL,
        \`is_active\` tinyint NOT NULL DEFAULT 1,

        UNIQUE INDEX \`IDX_CATEGORIES_NAME\` (\`name\`),
        UNIQUE INDEX \`IDX_CATEGORIES_SLUG\` (\`slug\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE \`products\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,

        \`name\` varchar(180) NOT NULL,
        \`slug\` varchar(200) NOT NULL,
        \`description\` varchar(255) NULL,
        \`image\` varchar(255) NULL,
        \`price\` decimal(12,2) NOT NULL DEFAULT 0.00,
        \`stock_quantity\` int NOT NULL DEFAULT 0,
        \`is_active\` tinyint NOT NULL DEFAULT 1,
        \`category_id\` int NOT NULL,

        INDEX \`IDX_PRODUCTS_NAME\` (\`name\`),
        UNIQUE INDEX \`IDX_PRODUCTS_SLUG\` (\`slug\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      ALTER TABLE \`products\`
      ADD CONSTRAINT \`FK_PRODUCTS_CATEGORY_ID\`
      FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`)
      ON DELETE RESTRICT
      ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`products\`
      DROP FOREIGN KEY \`FK_PRODUCTS_CATEGORY_ID\`
    `);

    await queryRunner.query(`
      DROP TABLE \`products\`
    `);

    await queryRunner.query(`
      DROP TABLE \`categories\`
    `);

    await queryRunner.query(`
      DROP TABLE \`users\`
    `);
  }
}
