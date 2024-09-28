import { MigrationInterface, QueryRunner } from "typeorm";

export class AtualizandoUserSettings1727562618498 implements MigrationInterface {
    name = 'AtualizandoUserSettings1727562618498'

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
