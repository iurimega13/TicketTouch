import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRamal1727833292231 implements MigrationInterface {
    name = 'AddUserRamal1727833292231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "ramal" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "ramal"
        `);
    }

}
