import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserAndSettings1727824211739 implements MigrationInterface {
    name = 'UpdateUserAndSettings1727824211739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "settings" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "settings" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "settings"
            ALTER COLUMN "notifications_settings"
            SET DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "settings"
            ALTER COLUMN "theme"
            SET DEFAULT 'light'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "settings"
            ALTER COLUMN "theme" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "settings"
            ALTER COLUMN "notifications_settings" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "settings"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "settings"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

}
