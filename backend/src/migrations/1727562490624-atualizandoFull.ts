import { MigrationInterface, QueryRunner } from "typeorm";

export class AtualizandoFull1727562490624 implements MigrationInterface {
    name = 'AtualizandoFull1727562490624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "settings" DROP COLUMN "notifications_settings"
        `);
        await queryRunner.query(`
            ALTER TABLE "settings"
            ADD "notifications_settings" boolean NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "settings" DROP COLUMN "notifications_settings"
        `);
        await queryRunner.query(`
            ALTER TABLE "settings"
            ADD "notifications_settings" character varying NOT NULL
        `);
    }

}
