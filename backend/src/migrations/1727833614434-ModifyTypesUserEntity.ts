import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyTypesUserEntity1727833614434 implements MigrationInterface {
    name = 'ModifyTypesUserEntity1727833614434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "phone_number" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "ramal" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "ramal"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "phone_number"
            SET NOT NULL
        `);
    }

}
